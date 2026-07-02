# Weekly Report
Performed by: Vũ Duy Nhất

Reviewed by: Trần Lê Hoàng Gia, Phan Lê Anh Minh, Nguyễn Nhựt Huy, Nguyễn Lê Hoàng Khải

Editied by: Vũ Duy Nhất

## Meeting Minutes: 6/6/2026
Nội dung họp
- Nói về PA2
- việc linking giữa fe và be, việc gửi http request/payload giữa fe và be
- Đặt tên endpoint
	+ /books/:id: User bấm vào cuốn sách và trang thông tin chi tiết của sách tương ứng đc render
	+ /books/:id/borrow-book: 
	+ /users/:id/edit-name: User sử dung chức năng đổi tên
- Việc phân loại các function vào folder chức năng tương ứng ở fe và be
- Nói về việc merge code: khi 1 thành viên hoàn thành 1 feature nào đó, báo cho PM để merge ngay nhánh đó vào dev, sau đó thành viên đó sẽ merge lại nhánh dev vào nhánh feature của mình


- Nói về database schema, tên các trường dữ liệu cho user
- Nói về việc thu thập dữ lieu, các trường dữ liệu hiện có
- Nói về GUI base cho user
- Nói về set up SpecKit, SSD
- Nói về cách tái sử dung style, nên mở một file style.js khai báo các thể loại style là object (tailwind css syntax hoặc syntax css thường) và export ra để component nào cần thì import vào sử dụng

- Gia: gửi các field name của book database
- Minh: gửi các field name của user database
## Meeting Minutes: 20/6/2026
Nội dung họp
    - Tổng kết những gì đã làm được trong tuần qua (đánh giá cách tổ chức code, web hiện tại)
    - Bàn về những đối tượng cụ thể cho user (không thu hẹp)
    - Nói về xác thực 1 lớp cho create acc, set hình ảnh cho email gửi verify otp, otp expire chỉnh xuống 30s, xử lý lưu hình avatar trên cloud r lưu url vào db
    - Nói về wishlist + Thêm thông tin về (location (name trong branches); address; shelf; quantity available) vao trang view book details
    - Nói về phần filter của Gia
    - Nói về SpecKit (workflow của agent) và evidence
    - Nói về việc đổi agent (open code, antigravity), đổi lõi model của agent (specify integration switch agy, agy auth login)
    - Nói về cách organize cho folder database, file makefile, file gitignore, file package.json và package-lock.json
    - Nói về AI Usage Note, và các project planning, vision document (khá ngắn)
    - Hướng dẫn đọc erd, giải thích thắc mắc + đánh giá database hiện tại(exercise)
    - Nói về role librarian, role admin (dựa theo các thiết kế trên figma) + thêm field mới vào table users, branches
    - Các task cho tuần tiếp theo, ý tưởng triển khai cho các task
    - Bonus (khuyến khích tìm tòi học hỏi công nghệ mới, ko fomo, sắp xếp code, hiểu code, đồ án reference)
## Meeting Minutes: 28/6/2026

Nội dung họp
 + Tổng kết những gì đạt được trong tuần qua (có thể đề cặp qua phương pháp, tech stack,... để thực hiện chức năng đó)
 + Ý tưởng nhóm 3 chức năng phối hợp room reserve + study group + library map
 + Anh Minh: Design thêm một số thứ
	+ Trang view profile cho user khi họ click vào avatar component của một user khác, cần ở phần study group (khác với khi user tự click vào avatar component để mở ra trang profile của mình)
	+ Nơi đặt sơ đồ mặt bằng 2D (2 cái cho 2 cơ sở) ở trang library map
 	+ Bỏ component study group của librarian ở trang dashboard giữ lại book (manage, pickup, return), room (list, calendar), announcements, pin verification (book (manage) cho hiện đầu tiên khi librarian vào dashboard)
	+ Làm lại tab book return ở trang dashboard/librarian/books để cung cấp chỗ cho librarian verify tình trạng của sách khi trả lại
	+ Có thể des them chỗ để crop avatar khi user tải ảnh của mình lên, để có thể zoom vào chỗ mong muốn trên bức ảnh
 + Thư viện jest và unit test
 + Công việc tuần sau và ý tưởng triển khai
 + Bonus
