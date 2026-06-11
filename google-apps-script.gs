/**
 * DOV PHỐ HIẾN — Nhận dữ liệu form ứng tuyển và ghi vào Google Sheet.
 * Bản GET/POST: nhận dữ liệu qua đường link (GET) HOẶC body (POST) đều được,
 * và KHÔNG ghi dòng trống nữa.
 *
 * ====== CÀI ĐẶT / CẬP NHẬT ======
 *  1. Mở đúng file Google Sheet muốn nhận dữ liệu -> Tiện ích mở rộng -> Apps Script.
 *  2. Xoá hết code cũ, DÁN TOÀN BỘ file này -> Lưu.
 *  3. (Kiểm tra) chọn hàm "testWrite" -> Run ▶ -> cấp quyền -> Sheet hiện 1 dòng TEST (xoá đi).
 *  4. Triển khai (Deploy):
 *       - Nếu LẦN ĐẦU:  Deploy -> Bản triển khai mới -> Ứng dụng web
 *                       (Execute as: Me, Access: Anyone) -> copy URL .../exec
 *       - Nếu ĐÃ deploy rồi và đang SỬA code:  Deploy -> Manage deployments
 *                       -> bút chì ✏ -> Version: "New version" -> Deploy   (URL giữ nguyên)
 *  5. Dán URL .../exec vào index.html ở dòng:  var SHEET_ENDPOINT = "";
 *
 *  >>> QUAN TRỌNG: mỗi lần sửa code phải làm lại bước "New version",
 *      nếu không link .../exec vẫn chạy code CŨ.
 */

var SHEET_NAME = 'Ứng tuyển';  // tab sẽ ghi; tự tạo nếu chưa có

function doGet(e)  { return handle_(e); }
function doPost(e) { return handle_(e); }

function handle_(e) {
  try {
    var d = readData_(e);
    if (!hasData_(d)) {
      // Không có dữ liệu -> chỉ là mở thử endpoint, KHÔNG ghi dòng trống.
      return ContentService.createTextOutput('DOV Pho Hien form endpoint is running.');
    }
    getSheet_().appendRow([
      new Date(),
      d.hoten || '', d.sdt || '', d.email || '',
      d.vitri || '', d.luong || '', d.khuvuc || '',
      d.kinhnghiem || '', d.ghichu || ''
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/* Đọc dữ liệu từ query (?hoten=...) hoặc từ body (form / JSON). */
function readData_(e) {
  if (!e) return {};
  if (e.parameter && hasData_(e.parameter)) return e.parameter;     // GET hoặc POST form
  if (e.postData && e.postData.contents) {
    try { var j = JSON.parse(e.postData.contents); if (j) return j; } catch (x) {}
  }
  return e.parameter || {};
}

function hasData_(d) {
  return !!(d && (d.hoten || d.sdt || d.email || d.vitri || d.luong || d.khuvuc || d.kinhnghiem || d.ghichu));
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Thời gian', 'Họ và tên', 'Số điện thoại', 'Email',
      'Vị trí ứng tuyển', 'Mức lương mong muốn', 'Khu vực làm việc', 'Kinh nghiệm', 'Ghi chú']);
    sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* Bấm Run hàm này để kiểm tra quyền ghi. */
function testWrite() {
  getSheet_().appendRow([new Date(), 'TEST', '0900000000', 'test@gmail.com',
    'Chuyên viên Kinh doanh BĐS', 'Thỏa thuận', 'Hà Nội', 'Không có', 'Dòng kiểm tra']);
}
