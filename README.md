# Máy Tính Casio fx-570VN PLUS & SysAdmin Toolkit

Ứng dụng web mô phỏng máy tính bỏ túi Casio fx-570VN PLUS, tích hợp công cụ tính toán mạng IPv4 Subnet/CIDR và bộ quy đổi đơn vị.

* **Truy cập trực tuyến:** https://mowfteedev.github.io/may-tinh/
* **Nền tảng:** Web tĩnh (HTML5 / CSS / Vanilla JS), chạy 100% Client-side, hỗ trợ PWA offline.

---

## Tính Năng Chính

### 1. Máy Tính Khoa Học (fx-570)
* Đầy đủ các phép toán: cộng, trừ, nhân, chia, phân số, căn bậc hai/ba, lũy thừa, logarit (`log`, `ln`), lượng giác (`sin`, `cos`, `tan`).
* Phím `S⇔D`: Chuyển đổi giữa phân số và số thập phân.
* Khử triệt để lỗi làm tròn số thực (`0.1 + 0.2 = 0.3`).
* Hỗ trợ gõ trực tiếp từ bàn phím số Numpad và bàn phím máy tính.
* Tự động lưu lịch sử phép tính trên trình duyệt.

### 2. Tính Toán Mạng IPv4 (Subnet & CIDR)
* Nhập địa chỉ IP và prefix (ví dụ `192.168.1.150/26`).
* Tự động tính: Network ID, Broadcast Address, Subnet Mask, Wildcard Mask, dải IP khả dụng và tổng số host.
* Phân loại dải IP theo chuẩn RFC: Private (RFC 1918), Loopback, Link-Local (APIPA), CGNAT (RFC 6598), TEST-NET (RFC 5737), Multicast, Public IP.
* Hiển thị dạng nhị phân 32-bit và nút sao chép nhanh từng thông số.

### 3. Quy Đổi Đơn Vị
* **Dữ liệu số:** Chuyển đổi giữa Byte, KB, MB, GB, TB (chuẩn $10^3$) và KiB, MiB, GiB, TiB (chuẩn $1024$).
* **Băng thông & Tải file:** Quy đổi tốc độ mạng (Mbps, MB/s) và ước tính thời gian tải file theo tốc độ đường truyền.
* **Đơn vị thông dụng:** Độ dài, khối lượng, nhiệt độ, thời gian.

---

## Hướng Dẫn Sử Dụng

### Chạy Trên Máy Tính (Local)
Không cần cài đặt thư viện hay môi trường Node.js:

```bash
# Mở trực tiếp bằng trình duyệt mặc định:
xdg-open index.html

# Hoặc khởi động server cục bộ nhẹ bằng Python:
python3 -m http.server 8080
```

Truy cập: `http://localhost:8080`

### Phím Tắt Bàn Phím
| Phím | Chức năng |
| :--- | :--- |
| `0` - `9` | Nhập số |
| `+`, `-`, `*`, `/` | Phép tính Cộng, Trừ, Nhân, Chia |
| `Enter` hoặc `=` | Tính kết quả |
| `Backspace` | Xóa lùi ký tự (`DEL`) |
| `Escape` | Xóa toàn bộ (`AC`) |
| `Shift` | Phím `SHIFT` (vàng) |
| `Alt` hoặc `A` | Phím `ALPHA` (đỏ) |
| `(` và `)` | Đóng/mở ngoặc |
| `^` | Lũy thừa |
| `S`, `C`, `T` | Hàm `sin`, `cos`, `tan` |
| `L` | Hàm `log` |
| `D` | Phím `S⇔D` (Phân số ⇔ Thập phân) |
| `M` | Mở menu chế độ (`MODE`) |

---

## Giấy Phép
Phát hành theo giấy phép [MIT](LICENSE).
