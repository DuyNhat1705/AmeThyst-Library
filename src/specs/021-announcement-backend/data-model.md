# Data Model: Announcement Management

This document details the database schema, entity attributes, validation rules, and state transitions for the Announcement entity.

## 1. Schema Definitions

The `announcements` table schema includes the following structure (with the additive migration for creator tracking):

### `announcements` Table

| Column Name | Data Type | Constraints | Default | Description |
|-------------|-----------|-------------|---------|-------------|
| `announce_id` | `UUID` | `PRIMARY KEY` | `gen_random_uuid()` | Unique identifier for each announcement |
| `created_by` | `UUID` | `FOREIGN KEY` references `users(user_id)` `ON DELETE SET NULL`, `NULLABLE` | `NULL` | The librarian or administrator who created the announcement |
| `created_at` | `TIMESTAMP` | `NOT NULL` | `CURRENT_TIMESTAMP` | Date and time when the record was created |
| `expired_date` | `DATE` | `NULLABLE` | `NULL` | Optional date after which the announcement is expired |
| `title` | `TEXT` | `NOT NULL` | - | The title of the announcement |
| `content` | `TEXT` | `NOT NULL` | - | The body content of the announcement |
| `status` | `VARCHAR(20)` | `NOT NULL`, `CHECK (status IN ('draft', 'active', 'expired'))` | `'draft'` | The status of the announcement |

## 2. SQL Migration (`07_announcement_alter.sql`)

An additive migration will be created at `src/database/init_db/postgres/07_announcement_alter.sql`:

```sql
-- Additive migration to link announcements to the librarian/admin who created them
ALTER TABLE public.announcements 
ADD COLUMN created_by UUID REFERENCES public.users(user_id) ON DELETE SET NULL;
```

This migration is purely additive, meaning it does not delete or modify existing columns, preserving all database compatibility and causing zero disruption to existing data.

## 3. Entity States and Transitions

The announcement status field undergoes the following lifecycle transitions:

```mermaid
stateDiagram-v2
    [*] --> draft : Create (default)
    draft --> active : Publish (Librarian action)
    active --> draft : Unpublish (Librarian action)
    active --> expired : Expiry Date Reached (Scheduler / Librarian)
    expired --> draft : Unpublish / Re-draft (Librarian action)
    expired --> active : Extend Expiry Date & Publish (Librarian action)
    draft --> [*] : Delete (Librarian action)
    active --> [*] : Delete (Librarian action)
    expired --> [*] : Delete (Librarian action)
```

### Transition Triggers

1. **Librarian Create (Default)**: Creates a new record in `draft` status.
2. **Librarian Publish**: Moves the announcement status from `draft` to `active` to make it publicly viewable.
3. **Librarian Unpublish**: Resets status from `active` back to `draft`.
4. **Auto-Expiration (Scheduler)**: Background task runs and automatically changes status from `active` to `expired` if `expired_date` is strictly less than the current date (today).
5. **Librarian Edit**: If an announcement's expiration date is extended and status is republished, it transitions back to `active`.
6. **Librarian Delete**: Permanently removes the record from the database.
