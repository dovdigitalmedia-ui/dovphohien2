/**
 * DOV PHỐ HIẾN — Nhận dữ liệu form ứng tuyển và ghi vào Google Sheet.
 *
 * CÁCH DÙNG (làm 1 lần, ~3 phút):
 *  1. Mở Google Sheet của bạn:
 *     https://docs.google.com/spreadsheets/d/1timfBWegHBZTjrPxLaUVSvNykqvzODGFeuY7vPJOLAo
 *  2. Menu: Tiện ích mở rộng (Extensions) -> Apps Script.
 *  3. Xoá hết code mẫu, DÁN TOÀN BỘ file này vào, bấm Lưu (biểu tượng đĩa).
 *  4. Bấm "Triển khai" (Deploy) -> "Bản triển khai mới" (New deployment).
 *  5. Chọn loại: "Ứng dụng web" (Web app).
 *        - Execute as (Thực thi với tư cách): Me / Tôi
 *        - Who has access (Ai có quyền truy cập): Anyone / Bất kỳ ai
 *  6. Bấm Triển khai -> Cấp quyền (Authorize) cho tài khoản của bạn.
 *  7. Copy "URL ứng dụng web" (dạng https://script.google.com/macros/s/..../exec).
 *  8. Mở file index.html, tìm dòng:
 *        var SHEET_ENDPOINT = "";
 *     và dán URL vừa copy vào giữa hai dấu ngoặc kép. Lưu lại là xong.
 *
 *  Mỗi lần ai đó ứng tuyển, một dòng mới sẽ tự xuất hiện trong Sheet.
 */

var SHEET_ID = '1timfBWegHBZTjrPxLaUVSvNykqvzODGFeuY7vPJOLAo';
var SHEET_NAME = 'Ứng tuyển';   // tên tab; tự tạo nếu chưa có

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // tránh ghi đè khi nhiều người gửi cùng lúc
  try {
    var d = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) { sheet = ss.insertSheet(SHEET_NAME); }

    // Tạo dòng tiêu đề nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Thời gian', 'Họ và tên', 'Số điện thoại', 'Email',
        'Vị trí ứng tuyển', 'Mức lương mong muốn', 'Khu vực làm việc',
        'Kinh nghiệm', 'Ghi chú'
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date(),
      d.hoten || '', d.sdt || '', d.email || '',
      d.vitri || '', d.luong || '', d.khuvuc || '',
      d.kinhnghiem || '', d.ghichu || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Mở URL ...exec trên trình duyệt sẽ thấy dòng này -> chứng tỏ đã deploy đúng.
function doGet() {
  return ContentService
    .createTextOutput('DOV Pho Hien form endpoint is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
