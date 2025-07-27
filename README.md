  # Payment Form with Razorpay Integration

  This is a full-stack Payment form with Razorpay integration built using:
  Frontend: React + Bootstrap
  Backend: Node.js + Express + Sequelize + MySQL
  Payment Gateway: Razorpay

This project uses Razorpay Test Mode for payment simulation and development.
Test API Keys:
              RAZORPAY_KEY_ID=rzp_test_SnZUKNH0j6UXSI
              RAZORPAY_KEY_SECRET=WP4Gwpg2AtEVqssYDoWL6Zh8
              
Test Card Details (for successful payment):
                                           Card Number: 4191 8802 1699 0917
                                           Expiry: Any future date (e.g., 12/26)
                                           CVV: 123
                                           OTP: 123456 (or any)
                                           
*Setup instructions:

  Ensure the following are installed on your system:
  Node.js (v16 or higher)
  npm (v8 or higher)
  MySQL Server (running)
  Git
  Clone the repository:
  git clone https://github.com/Nirav-prajapati1502/razorpay-contribution-form.git
  cd razorpay-contribution-form

*How to run frontend/backend:
  Backend: cd backend
            npm start
  Frontend: cd ../frontend
             npm start

*Sample .env file for Razorpay credentials:
  Create a .env file inside the /backend folder
  PORT=5000
  RAZORPAY_KEY_ID=your_razorpay_key_id
  RAZORPAY_KEY_SECRET=your_razorpay_key_secret
  RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=your_mysql_password
  DB_NAME=contribution           

*API structure and sample requests/responses:
  Create Razorpay order
  Endpoint:POST/createorder
  Description: Creates a Razorpay order and stores contribution details in the database.
  Request :
  {
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "amount": 2500,
  "tip": 18,
  "anonymous": false,
  "address": "123 Main Street"
  }
  Response:
  {
  "orderId": "order_NcG2S9Aq123XYZ",
  "amount": 295000,
  "currency": "INR",
  "key": "rzp_test_xxxxxxxx",
  "name": "Contribution Point"
  }
