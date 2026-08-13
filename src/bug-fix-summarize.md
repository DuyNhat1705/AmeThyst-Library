# Bug-fix summary — Code audit findings

Ngày hoàn thành: 2026-08-13

## Phạm vi đã sửa

### Xác thực và phiên đăng nhập

- Loại bỏ JWT khỏi URL Google OAuth và khỏi `sessionStorage`.
- Access token được lưu bằng cookie `HttpOnly`, thời hạn 15 phút; refresh token dùng cookie `HttpOnly` riêng, có rotation, token-family và phát hiện reuse.
- Thêm `/auth/me`, `/auth/refresh`, `/auth/logout`, `/auth/csrf`; FE tự bootstrap user từ server, tự refresh một lần khi access token hết hạn và xóa trạng thái khi nhận 401.
- Thêm CSRF double-submit cho request thay đổi dữ liệu khi dùng cookie auth.
- JWT được khóa `HS256`, issuer và audience; server kiểm tra `status`, `role`, `branch_id` và `token_version` từ DB. Socket.IO dùng cùng cookie và kiểm tra lại DB.
- Đổi mật khẩu/reset mật khẩu, đổi role và suspend/unsuspend đều tăng `token_version`, thu hồi refresh session và ngắt socket đang mở.
- Thêm validation email/username/password ở server, rate limit toàn API và rate limit riêng cho login/register/OTP/recovery.
- Login có dummy password comparison, bộ đếm thất bại và khóa tạm tài khoản. Register/forgot/resend dùng phản hồi chung để tránh dò email.
- OTP dùng `crypto.randomInt`, chỉ lưu HMAC hash, giới hạn 5 lần thử và kiểm tra expiry trước khi reset.

### Network và server hardening

- CORS HTTP và Socket.IO chỉ cho phép `CLIENT_URL`/`CORS_ALLOWED_ORIGINS`; bật credentials.
- Thêm Helmet, giới hạn body 100 KB và phản hồi 413 có cấu trúc.
- Avatar URL chỉ nhận HTTPS từ allowlist, resolve DNS và chặn IP private/link-local, kiểm tra lại mỗi redirect, timeout 5 giây, giới hạn 2 MB và xác thực ảnh bằng Sharp.
- Server fail-fast khi thiếu biến môi trường bắt buộc.
- Python recommendation process và scheduler child process được theo dõi và dừng khi server shutdown.
- Memgraph và Memgraph Lab chỉ bind `127.0.0.1`.

### Phân quyền và dữ liệu theo chi nhánh

- Toàn bộ pickup, verify/confirm/cancel borrow, verify/preview/confirm return, active borrowing, debt, paid fee, payment và room check-in của librarian lấy branch từ `req.user.branch_id`.
- Không còn fallback `|| 1`; librarian thiếu branch nhận lỗi `BRANCH_REQUIRED`.
- Lookup/transaction đều có điều kiện `branch_id`; client không thể giả branch qua request body hoặc dùng `penalty_id` của chi nhánh khác.
- Admin vẫn được quản lý announcement như trước; các nghiệp vụ vận hành sách/phòng vẫn chỉ dành cho librarian có branch.

### SQL, transaction và giới hạn dữ liệu

- Multi-row insert recommendation dùng placeholder hoàn toàn, không còn nội suy `userId`, `bookId`, `score` hay timestamp.
- Reservation phòng khóa `room_avail` bằng `FOR UPDATE` rồi kiểm tra reservation đang hoạt động trong cùng transaction.
- Reservation sách khóa row user bằng `FOR UPDATE` trước khi kiểm tra/tăng `borrow_num`, đồng thời giữ khóa inventory hiện có.
- Danh sách catalog luôn có `LIMIT/OFFSET`, API giới hạn page size tối đa 100; export user tối đa 1.000 dòng và trả `X-Export-Truncated`.
- Các query mới đã đối chiếu với schema hiện tại trong `database/init_db/postgres`: `users`, `otp_store`, `borrow_book`, `return_book`, `book_penalty`, `room_avail`, `reserve_room`, `recommends`.

### Database migration

- Thêm `database/init_db/postgres/08_security_hardening.sql` để tạo:
  - `users.failed_login_attempts`, `users.locked_until`;
  - `otp_store.otp_hash`, `otp_store.attempt_count` và loại bỏ plaintext `otp`;
  - bảng `auth_sessions` cùng các index phục vụ rotation/revocation.
- `database/Makefile` đã dùng đúng đường dẫn `init_db/postgres`, import migration 08 và có target `apply-security-hardening` cho DB hiện hữu.
- Lưu ý: thư mục `database/init_db` đang bị `.gitignore` bỏ qua. Khi commit cần force-add migration: `git add -f src/database/init_db/postgres/08_security_hardening.sql`.

### FE và UX

- Các request auth/profile/library/wishlist/recommendation/librarian/book-management/avatar dùng cookie credentials; request thay đổi dữ liệu gửi CSRF.
- Dashboard chờ `/auth/me` hoàn tất trước khi redirect, role lấy từ server thay vì object trong browser storage.
- Google callback không đọc query token và dọn URL trước khi điều hướng.
- `apiClient` xử lý response không phải JSON, 204, refresh một lần và mọi 401.
- Socket client dùng cookie, không dùng token JS.
- Sửa dependency của recommendations effect; loại bỏ gate `localStorage` sai ở statistics; NavBar không còn tạo `href=""`.
- Thêm dashboard error boundary với nút thử lại.
- Component `VerificationModal` được nêu trong audit không tồn tại trong source hiện tại và không có production import; librarian đang dùng `InlinePinVerification` gọi API thật.
- Client không còn gọi `/api/dashboard/events`; dashboard tổng hợp lịch từ borrow, room reservation và study group thật.

## Hướng dẫn kiểm định trên FE

Trước khi test DB hiện hữu, chạy migration 08. Sau đó khởi động PostgreSQL/Memgraph, server và client bằng cấu hình `CLIENT_URL` đúng origin FE.

| Khu vực FE | Kịch bản tester cần kiểm tra | Kết quả mong đợi |
|---|---|---|
| `/login` | Login đúng/sai nhiều lần; reload tab; để access token hết hạn rồi thao tác | Không có token trong URL/sessionStorage; reload vẫn đăng nhập; access token tự refresh; thử sai quá ngưỡng bị rate-limit/lock tạm |
| `/register`, `/check-mail`, `/verify-email` | Đăng ký email mới, email đã có, resend, link hết hạn | Phản hồi không tiết lộ email tồn tại; link hợp lệ tạo phiên cookie và redirect đúng role |
| `/forgot-password` và flow OTP | Xin OTP, nhập sai quá 5 lần, OTP hết hạn, reset thành công | Không dò được email; OTP sai/hết hạn có lỗi rõ; reset xong mọi phiên cũ bị đăng xuất |
| Google Sign-in → `/auth/callback` | Đăng nhập mới và user cũ | Callback URL không có `token`/`user`; user suspended không đăng nhập được |
| DevTools → Application/Network | Xem cookies, storage và request POST/PUT/PATCH/DELETE | Access/refresh là HttpOnly; không có JWT trong web storage; request cookie-auth có `X-CSRF-Token` |
| `/profile` | Load/update profile và upload/crop avatar file | Profile hoạt động sau reload; upload file <=2 MB thành công |
| `/profile` avatar URL | Dán Cloudinary/Google-hosted HTTPS URL và URL localhost/private/host lạ | Host allowlist hợp lệ hoạt động; private IP, HTTP, host lạ, redirect lạ hoặc >2 MB bị từ chối |
| `/profile/security` | Đổi mật khẩu | Thành công rồi quay về login; tab/socket/refresh token cũ không dùng lại được |
| `/library` và `/library/[bookId]` | Pagination, wishlist, reserve; gửi hai reservation đồng thời | Limit không thể vô hạn; wishlist/reserve dùng cookie; không vượt borrow limit/inventory |
| `/dashboard/user/recommendations` | Load, renew, click book | Không loop request; click/search history vẫn được ghi; dữ liệu recommendation vẫn hiển thị |
| `/dashboard/user` | Xem lịch | Lịch gồm borrow due, room reservation và study group; không còn request 404 `/api/dashboard/events` |
| `/dashboard/librarian` pickup/return/fees | Dùng librarian branch A, chuẩn bị dữ liệu ở A và B | Chỉ thấy/xử lý dữ liệu A; sửa `branch_id` trong body không cho truy cập B; penalty B không thanh toán được |
| `/dashboard/librarian` rooms | Hai browser cùng giữ một slot và check-in PIN hết hạn | Chỉ một reservation thành công; PIN sai/hết hạn trả lỗi nghiệp vụ, không tạo check-in |
| `/dashboard/admin/authorization` | Đổi role hoặc suspend user đang online | User bị ngắt socket, request/refresh cũ bị từ chối và phải đăng nhập lại |
| Admin users export | Export tập >1.000 user | CSV tối đa 1.000 dòng; header `X-Export-Truncated: true` |
| Announcement management | Kiểm tra cả admin và librarian | Cả hai role vẫn quản lý announcement; librarian không được dùng nghiệp vụ của branch khác |

Kiểm tra negative CSRF: từ DevTools replay một request thay đổi dữ liệu nhưng xóa/sửa `X-CSRF-Token`; server phải trả 403 `CSRF_INVALID`.

## Kết quả kiểm tra tự động

- `node --check` trên toàn bộ server `.mjs` đã sửa: đạt.
- `client: npx tsc --noEmit`: đạt.
- Suite hardening mới và recommendation hiện có: 14/14 test đạt.
- Full backend suite: 173/241 test đạt, 68 test chưa đạt. Các nhóm đỏ gồm:
  - test auth cũ vẫn yêu cầu JWT trong response/URL và thông báo phân biệt email — trái với contract bảo mật mới;
  - test librarian cũ vẫn truyền/expect branch từ body hoặc không có branch scope;
  - test middleware cũ chưa expect `HS256`/issuer/audience;
  - các test reservation/return phụ thuộc `systemConfigurationService` chưa initialize, là nhóm lỗi nền đã có trước đợt sửa.
- FE lint còn 41 lỗi React Compiler trên toàn project; phần lớn là lỗi nền `set-state-in-effect`/purity ở component không thuộc audit. Không có lỗi TypeScript.
- Production build bị chặn ở bước tải Google Fonts (`fonts.gstatic.com`) của Turbopack trong môi trường chạy; lần thử lại có network vẫn không tải đủ font. Đây không phải lỗi compile TypeScript của thay đổi.

Do contract auth và branch-scoping đã thay đổi có chủ đích, các test legacy nêu trên cần được cập nhật theo cookie session/generic response/server-derived branch trước khi CI có thể xanh hoàn toàn. Không nên sửa production code quay lại hành vi cũ chỉ để thỏa các assertion không còn an toàn.
