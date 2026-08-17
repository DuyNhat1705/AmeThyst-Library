-- 08_notifications.sql
-- Add notifications table

CREATE TABLE IF NOT EXISTS public.notifications (
    notification_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    category character varying(50) NOT NULL,
    source_ref_id character varying(255) NOT NULL,
    payload jsonb NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT notifications_pkey PRIMARY KEY (notification_id),
    CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);

DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'lib_admin') THEN
        ALTER TABLE public.notifications OWNER TO lib_admin;
    END IF;
END
$$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_notifications_user_source ON public.notifications(user_id, category, source_ref_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, created_at DESC) WHERE is_read = false;
CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON public.notifications(user_id, created_at DESC);
