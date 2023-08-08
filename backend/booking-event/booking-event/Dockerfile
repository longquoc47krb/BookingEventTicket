# Sử dụng một base image có hỗ trợ Java (ví dụ: OpenJDK)
FROM openjdk:19

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép các tệp JAR vào thư mục làm việc trong container
COPY target/booking-event-0.0.1-SNAPSHOT.jar app.jar

# Chạy ứng dụng Spring Boot khi container được khởi chạy
CMD ["java", "-jar", "app.jar"]
