# 🖩 Casio fx-570VN PLUS & SysAdmin Toolkit

> **Mô phỏng máy tính khoa học Casio fx-570VN PLUS huyền thoại kết hợp bộ công cụ tính toán mạng IP CIDR Subnet và quy đổi đơn vị chuyên dụng cho dân Kỹ thuật / SysAdmin / NetEng.**

[![Deploy to GitHub Pages](https://github.com/mowfteedev/may-tinh/actions/workflows/pages.yml/badge.svg)](https://github.com/mowfteedev/may-tinh/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform: Web / PWA](https://img.shields.io/badge/Platform-Web%20%2F%20PWA-indigo.svg)](https://mowfteedev.github.io/may-tinh/)

---

## 🌐 Trải Nghiệm Trực Tuyến (Live Demo)
👉 **Truy cập ngay:** [https://mowfteedev.github.io/may-tinh/](https://mowfteedev.github.io/may-tinh/)

---

## 🌟 Tính Năng Nổi Bật

### 1. 🖩 Giả Lập Casio fx-570VN PLUS Chân Thực
* **Ngoại hình kinh điển**: Thân máy vát cong công thái học màu xám kim loại, logo CASIO và dòng chữ huyền thoại *NATURAL-V.P.A.M.*
* **Màn hình LCD 2 dòng chuẩn Casio**: Dòng biểu thức tự nhiên phía trên, dòng kết quả to bên dưới cùng hàng chỉ báo trạng thái (`S`, `A`, `M`, `D`, `Math`).
* **Phím thần thánh `S⇔D`**: Chuyển đổi qua lại tức thì giữa **Phân số tối giản / Hỗn số $\Leftrightarrow$ Số thập phân**.
* **Âm thanh gõ phím Tactile**: Tích hợp âm thanh bấm nút cơ học qua Web Audio API (chạy 100% offline không cần file mp3, có nút bật/tắt).
* **Hỗ trợ toàn diện bàn phím PC**: Gõ trực tiếp từ bàn phím số Numpad (`0-9`, `+`, `-`, `*`, `/`, `Enter` để tính, `Backspace` để xóa `DEL`, `Esc` để xóa sạch `AC`).
* **Menu MODE chuẩn Casio**: Bấm phím `MODE` trên máy để hiển thị menu chọn chế độ (`1: COMP`, `2: IP-NET`, `3: CONV`, `4: BASE-N`).

### 2. 🌐 Bộ Tính Toán Mạng IPv4 Subnet & CIDR (SysAdmin Toolkit)
* **Nhập linh hoạt**: Hỗ trợ chuẩn CIDR (như `192.168.1.150/26`) hoặc chọn dropdown từ `/0` đến `/32`.
* **Thông số mạng chi tiết**:
  * **Network ID & Broadcast Address** (kèm ký hiệu CIDR).
  * **Subnet Mask & Wildcard Mask** (hiển thị cả dạng thập phân và nhị phân 32-bit phân tách octet).
  * **Dải IP gán cho thiết bị** (First Usable Host $\rightarrow$ Last Usable Host).
  * **Số lượng Host khả dụng**.
  * **Phân loại chuẩn quốc tế (RFC)**: Tự động nhận diện RFC 1918 Private, Loopback (RFC 1122), Link-Local/APIPA (RFC 3927), Carrier-Grade NAT CGNAT (RFC 6598), TEST-NET (RFC 5737), Multicast, Public Internet.
  * Hỗ trợ chuẩn cả các trường hợp mạng đặc thù: `/31` Point-to-Point (RFC 3021) và `/32` Single Host.
* **Nút Copy 1-Click**: Dễ dàng sao chép từng thông số mạng vào clipboard.

### 3. ⚖️ Bộ Quy Đổi Đơn Vị Thực Chiến (Unit Converter)
* **Dung lượng số (Data Storage)**: Chuyển đổi 2 chiều giữa Bit, Byte, KB, MB, GB, TB, PB (chuẩn Thập phân $1000$) và KiB, MiB, GiB, TiB, PiB (chuẩn Nhị phân $1024$).
* **Tốc độ truyền dữ liệu / Băng thông mạng**: bps, Kbps, Mbps, Gbps, B/s, KB/s, MB/s, GB/s.
* **Công cụ tính thời gian tải file**: Nhập dung lượng file (ví dụ: `15 GB`) và tốc độ mạng (ví dụ: `100 Mbps`) $\rightarrow$ Tính ra chính xác số giờ, phút, giây cần để tải xong.
* **Đơn vị thường dùng khác**: Độ dài (m, km, inch, ft, mile...), Khối lượng (kg, g, lb, oz, tấn...), Nhiệt độ (°C, °F, K), Thời gian (s, min, h, day, week...).

### 4. 📜 Lưu Trữ Lịch Sử Tính Toán
* Tự động lưu trữ lịch sử các phép tính đã bấm trên máy tính Casio vào `localStorage`.
* Cho phép click vào bất kỳ phép tính nào trong quá khứ để nạp lại vào máy tính fx-570.

### 5. 📱 PWA & Desktop App Trên Linux
* Tích hợp `manifest.json` và Service Worker (`sw.js`).
* Có thể cài đặt trực tiếp thành **Desktop App** trên Arch Linux / Ubuntu / Windows hoặc đưa ra màn hình chính trên iOS/Android để sử dụng offline hoàn toàn.

---

## 🚀 Hướng Dẫn Sử Dụng & Triển Khai

### Cách 1: Chạy trực tiếp trên máy tính (Offline Local)
Không cần cài đặt bất kỳ runtime hay thư viện nào (`zero-dependency`):
```bash
# Mở trực tiếp bằng trình duyệt mặc định trên Linux
xdg-open index.html

# Hoặc khởi chạy local server nhẹ với Python:
python3 -m http.server 8080
# Sau đó mở trình duyệt tại: http://localhost:8080
```

### Cách 2: Kích hoạt GitHub Pages trên Repository
1. Vào repository GitHub của bạn: `https://github.com/mowfteedev/may-tinh`.
2. Vào **Settings** $\rightarrow$ **Pages** (thanh menu bên trái).
3. Tại mục **Build and deployment** $\rightarrow$ **Source**:
   - Chọn **GitHub Actions** (để dùng workflow tự động `.github/workflows/pages.yml`), 
   - Hoặc chọn **Deploy from a branch** $\rightarrow$ chọn nhánh `main` $\rightarrow$ thư mục `/ (root)` $\rightarrow$ bấm **Save**.
4. Chờ 30 giây, trang web sẽ tự động online tại:
   `https://mowfteedev.github.io/may-tinh/`

---

## ⌨️ Phím Tắt Bàn Phím (Keyboard Shortcuts)
| Phím | Chức Năng Trên Casio fx-570 |
| :---: | :--- |
| `0` - `9` | Nhập các chữ số |
| `+`, `-`, `*`, `/` | Các phép tính Cộng, Trừ, Nhân (`×`), Chia (`÷`) |
| `Enter` hoặc `=` | Thực hiện phép tính (`=`) |
| `Backspace` | Xóa lùi 1 ký tự (`DEL`) |
| `Escape` | Xóa sạch màn hình (`AC`) |
| `(` và `)` | Dấu đóng / mở ngoặc |
| `^` | Lũy thừa ($x^y$) |
| `S` / `C` / `T` | Hàm lượng giác `sin(`, `cos(`, `tan(` |
| `L` | Hàm `log(` |
| `D` | Phím `S⇔D` chuyển đổi Phân số $\Leftrightarrow$ Số thập phân |
| `M` | Mở menu `MODE` chọn chế độ |

---

## 🛠️ Công Nghệ Sử Dụng
* **HTML5 Semantic & Modern CSS3** (Custom Properties, Flexbox, CSS Grid).
* **Modular ES6+ JavaScript** (Pure Vanilla, Zero Runtime Bloat).
* **Web Audio API** (Âm thanh phản hồi xúc giác cơ học).
* **Progressive Web App (PWA)** (Service Worker + Web App Manifest).

---

## 📄 Bản Quyền (License)
Phát hành theo giấy phép [MIT License](LICENSE). Tự do sử dụng, chỉnh sửa và phân phối.
