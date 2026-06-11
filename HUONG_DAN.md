# DOV PHỐ HIẾN — Trang tuyển dụng Sale Bất Động Sản

Trang landing 1 trang (single page), responsive, HTML/CSS/JS thuần — **không cần framework**.

## 1. Chạy ngay
- Mở thẳng file **`index.html`** bằng trình duyệt là chạy được.
- Logo và ảnh đã **nhúng sẵn vào file** nên không lo lỗi đường dẫn.
- Cần internet lần đầu để tải font Google; offline vẫn hiển thị bằng font hệ thống.

## 2. Nút "Ứng tuyển" → mở form dạng popup
- Mọi nút "Ứng tuyển" (nút nổi nhấp nháy, header, hero, menu mobile, footer, thẻ trong mục Ứng tuyển) đều **mở popup form ngay khi bấm**.
- Popup có **logo + tiêu đề DOV Phố Hiến** ở đầu, đóng bằng nút ✕, bấm ra ngoài hoặc phím **Esc**.
- Gửi thành công → hiện lời cảm ơn và **tự đóng sau 2,5 giây**.

## 3. ⭐ NỐI FORM VỚI GOOGLE SHEET (quan trọng)
Trang web tĩnh **không thể tự ghi vào Google Sheet chỉ bằng đường link** — cần tạo 1 "cửa nhận dữ liệu" miễn phí bằng Google Apps Script (làm 1 lần, ~3 phút):

1. Mở file **`google-apps-script.gs`** kèm theo và làm **đúng 8 bước** ghi trong đó. Tóm tắt:
   - Vào Sheet của bạn → **Tiện ích mở rộng › Apps Script**.
   - Dán toàn bộ nội dung file `.gs` → **Lưu**.
   - **Triển khai › Bản triển khai mới › Ứng dụng web**, chọn *Execute as: Me*, *Access: Anyone* → **Triển khai** → cấp quyền.
   - **Copy URL** dạng `https://script.google.com/macros/s/..../exec`.
2. Mở **`index.html`**, tìm dòng (gần cuối, trong thẻ `<script>`):
   ```js
   var SHEET_ENDPOINT = "";
   ```
   Dán URL vừa copy vào giữa hai dấu ngoặc kép:
   ```js
   var SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfyc..../exec";
   ```
3. Lưu lại. Xong! Mỗi lần có người ứng tuyển, một dòng mới tự xuất hiện trong Sheet
   (ID Sheet của bạn đã được điền sẵn trong file `.gs`).

> Khi để trống `SHEET_ENDPOINT`, form vẫn chạy và hiện lời cảm ơn nhưng **chưa gửi đi đâu** — tiện để xem thử giao diện.
> Dữ liệu ghi vào Sheet gồm các cột: Thời gian · Họ và tên · Số điện thoại · Email · Vị trí ứng tuyển · Mức lương mong muốn · Khu vực làm việc · Kinh nghiệm · Ghi chú.

## 4. Các trường trong form
Họ và tên (bắt buộc) · Số điện thoại (bắt buộc) · Email · Vị trí ứng tuyển (bắt buộc) · Mức lương mong muốn · Khu vực làm việc (bắt buộc) · Kinh nghiệm · Ghi chú.
Muốn thêm/bớt lựa chọn trong các ô chọn (vị trí, mức lương, khu vực…), sửa các thẻ `<option>` trong form ở `index.html`.

## 5. Sửa nội dung / màu / font
- Nội dung tiếng Việt nằm trực tiếp trong HTML, tìm theo comment `<!-- ... -->` (HERO, GIỚI THIỆU, THU NHẬP, LỘ TRÌNH, YÊU CẦU, VĂN PHÒNG, ỨNG TUYỂN, FOOTER).
- Màu & font khai báo ở khối `:root{ }` đầu thẻ `<style>` (navy `#1a365d`, gold `#d4af37`…). Đổi 1 dòng là toàn trang đổi theo.
- Số hotline: sửa cả phần `href="tel:..."` lẫn chữ hiển thị.

## 6. Thay logo / ảnh
- Ảnh tối ưu sẵn nằm trong thư mục `assets/`. Muốn thay ảnh mới, gửi mình ảnh để nhúng lại, hoặc tự thay chuỗi `src="data:image..."` bằng đường dẫn file (ví dụ `src="assets/poster-recruit.webp"`) rồi để `index.html` cùng thư mục `assets/`.

## 7. Đăng lên mạng (miễn phí)
- **Netlify:** netlify.com → kéo–thả cả thư mục (gồm `index.html` + `assets/`) → có link ngay.
- **GitHub Pages:** tạo repo → upload → Settings › Pages › chọn nhánh → Save.
- **Hosting cPanel:** upload vào `public_html/`.

© 2026 DOV PHỐ HIẾN.
