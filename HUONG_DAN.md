# DOV PHỐ HIẾN — Trang tuyển dụng Sale Bất Động Sản

Landing 1 trang, responsive, HTML/CSS/JS thuần — không cần framework. Logo & ảnh đã nhúng sẵn.

## 1. Chạy ngay
Mở thẳng **`index.html`** bằng trình duyệt là chạy. Link Google Sheet đã **nhúng sẵn** trong file, không cần dán gì thêm.

## 2. Popup ứng tuyển
- Mọi nút "Ứng tuyển" mở popup form; popup cũng **tự bật khi vừa vào trang** (cho link quảng cáo).
  Tắt tự bật: sửa `var AUTO_OPEN_APPLY = true;` thành `false`.
- Popup có logo + tiêu đề, đóng bằng ✕ / Esc / bấm ra ngoài.
- Gửi xong → hiện cảm ơn và **tự đóng sau 2,5 giây**.
- Form gửi dữ liệu lên Sheet bằng **GET** (đính dữ liệu trong link) → ổn định, không bị rớt.

## 3. Link Google Sheet (đã nhúng sẵn)
Trong `index.html`, dòng:
```js
var SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycby.../exec";
```
- Phải là link **/exec** (công khai). KHÔNG dùng /dev (chỉ chạy khi chính bạn đăng nhập).
- Đổi link khác: thay chuỗi trong cặp ngoặc kép ở dòng trên.

### Kiểm tra link có ghi được không (không cần web)
Dán link sau lên trình duyệt (thay phần `/s/.../exec` bằng link của bạn):
```
https://script.google.com/macros/s/AKfycby.../exec?hoten=Nguyen Test&sdt=0901234567&email=test@gmail.com&vitri=Chuyên viên Kinh doanh BĐS&luong=Thỏa thuận&khuvuc=Hà Nội&kinhnghiem=Không có&ghichu=Thử
```
- Hiện `{"ok":true}` + Sheet có 1 dòng đầy đủ ⇒ chuẩn.
- `{"ok":true}` nhưng không có dòng ⇒ bản /exec đang chạy code cũ → xem mục 4.

## 4. Cài đặt / cập nhật Apps Script (nếu cần)
1. Mở đúng Google Sheet → **Tiện ích mở rộng › Apps Script**.
2. Xoá code cũ, dán toàn bộ **`google-apps-script.gs`** → Lưu.
3. (Kiểm tra) chọn hàm **`testWrite`** → Run ▶ → cấp quyền → Sheet hiện dòng TEST (xoá đi).
4. Triển khai:
   - Lần đầu: **Deploy › Bản triển khai mới › Ứng dụng web** (Execute as **Me**, Access **Anyone**) → copy URL `/exec`.
   - Đã có rồi mà vừa sửa code: **Deploy › Manage deployments › ✏ › Version: New version › Deploy** (URL giữ nguyên).
5. Nếu URL khác link đã nhúng → dán URL `/exec` mới vào `SHEET_ENDPOINT` trong `index.html`.
> Nếu thấy email "Summary of failures … Trigger: open": vào Triggers (⏰) bên trái Apps Script, **xoá hết trigger** (web app không cần trigger nào).

## 5. Các trường form
Họ và tên* · Số điện thoại* · Email · Vị trí ứng tuyển* · Mức lương mong muốn · Khu vực làm việc* · Kinh nghiệm · Ghi chú. (* bắt buộc). Cột ghi vào Sheet: Thời gian + 8 trường trên. Sửa lựa chọn: chỉnh các `<option>` trong `index.html`.

## 6. Sửa nội dung / màu / font
- Nội dung: tìm theo comment `<!-- ... -->` (HERO, GIỚI THIỆU, THU NHẬP, LỘ TRÌNH, YÊU CẦU, VĂN PHÒNG, ỨNG TUYỂN, FOOTER).
- Màu & font: khối `:root{ }` đầu `<style>` (navy `#1a365d`, gold `#d4af37`).
- Hotline: sửa cả `href="tel:..."` lẫn chữ hiển thị.

## 7. Thay logo / ảnh
Ảnh tối ưu trong `assets/`. Thay: đổi `src="data:image..."` thành `src="assets/..."`, hoặc gửi mình nhúng lại.

## 8. Đăng lên mạng (miễn phí)
Netlify (kéo–thả thư mục gồm `index.html` + `assets/`) · GitHub Pages · Hosting cPanel (`public_html/`).

## 9. Kiểm tra cuối cùng
Mở `index.html` ở cửa sổ **ẩn danh** (Ctrl+Shift+N, không đăng nhập Google) → điền form → nếu Sheet hiện dòng mới đầy đủ là sẵn sàng chạy quảng cáo.

© 2026 DOV PHỐ HIẾN.
