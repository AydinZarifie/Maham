const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
	// 1) create transporter >>> like gmail
	const transporter = nodemailer.createTransport({
		// service: 'gmail',
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			// user: 'aydinzarifieaszo@gmail.com',
			// pass: 'rwtrwybhtbugnqxc',
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
		// activate less secure app option in gmail account >> if service selected
	});

	// 2) set options
	const mailOptions = {
		from: 'moein Agasi <gartalTraxtor345@yahoo.com>',
		// from: 'aydinzarifieaszo@gmail.com',
		to: options.email,
		subject: options.subject,
		text: options.message,
		html: `
		<div
		  style="
		    background: linear-gradient(to left, #ef4057, #ef4077);
		    min-height: 100%;
		    padding-top: 20px;
		    padding-bottom:20px;
		    padding-left: 10px;
		    padding-right: 10px;
		    align-items: center;
		  "
		>
		  <div
		    class="container"
		    style="
		      min-height: 300px;
		      max-width: 530px;
		      margin: 0 auto;
		      background-color: #fff;
		      padding: 10px 10px 10px 10px;
		      border-radius: 10px;
		      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		      text-align:center;
		    "
		  >
		      <img
		        class="logo"
		        src="cid:myImage"
		        style="width: 190px; height: 70px;
		         "
		        alt="Logo"
		      />
		    <div
		      class="info"
		      style="
		        margin-bottom: 20px;
		        width: 90%;
		        background-color:#ef4077;
		        color: #ffffff;
		        height: 40px;
		        font-size: 20px;
		        margin-left: 5%;
		        padding-top: 14px;
		        border-radius: 10px;
		        text-align: center;
		        padding-left: 10px;
		      "
		    >
		      Email Safety phrase
		    </div>
		    <p
		      style="
		        text-align: left;
		        font-family: URWDIN;
		        font-size: 14px;
		        line-height: 22px;
		        text-align: left;
		        color: rgba(1, 8, 30, 0.6);
		        padding: 0 10px 0 10px;
		      "
		    >
		      Dear Maham admin:
		    </p>
		    <p
		      style="
		        text-align: left;
		        font-family: URWDIN;
		        font-size: 14px;
		        line-height: 22px;
		        text-align: left;
		        color: rgba(1, 8, 30, 0.6);
		        padding: 0 10px 0 10px;
		      "
		    >
		      this is your Verification code for log in :
		    </p>
		    <button
		      style="
		        background-color: transparent;
		        color: #333;
		        padding: 10px 20px;
		        border: none;
		        border-radius: 4px;
		        cursor: pointer;
		        font-weight: 500;
		        font-size: 30px;
		        text-align: left;
		        width: 100%;
		      "
		    >${options.verificationCode}
		    </button>
		    <p
		      style="
		        text-align: left;
		        font-family: URWDIN;
		        font-size: 14px;
		        line-height: 22px;
		        text-align: left;
		        color: rgba(1, 8, 30, 0.6);
		        padding: 0 10px 0 10px;
		      "
		    >
		      This code remains valid for 10 minutes. Please do not disclose it to
		      anyone (including Maham staff)
		    </p>

		    <div
		      class="code-container"
		      style="
		        margin-top: -10px;
		        padding: 10px 10px 0px 10px;
		        background-color: #f9f9f9;
		        border: 1px solid #ccc;
		        text-align: left;
		        border-radius: 10px;
		      "
		    >
		    <div style="margin: 0 auto; max-width: 568px; background-color: #f9f9f9;">
		    <table
		      align="center"
		      border="0"
		      cellpadding="0"
		      cellspacing="0"
		      role="presentation"
		      style="width: 100%"
		    >
		      <tbody>
		        <tr>
		          <td
		            style="
		              direction: ltr;
		              font-size: 0;
		              padding: 0;
		              padding-bottom: 24px;
		              text-align: center;
		            "
		          >
		            <div
		              class="m_-5146143764419861847mj-column-per-100"
		              style="
		                font-size: 0;
		                text-align: left;
		                direction: ltr;
		                display: inline-block;
		                vertical-align: top;
		                width: 100%;
		              "
		            >
		              <table
		                border="0"
		                cellpadding="0"
		                cellspacing="0"
		                role="presentation"
		                style="vertical-align: top"
		                width="100%"
		              >
		                <tbody>
		                  <tr>
		                    <td
		                      align="left"
		                      class="m_-5146143764419861847list"
		                      style="
		                        background: #f9f9f9;
		                        font-size: 0;
		                        padding: 10px 0px;
		                        word-break: break-word;
		                      "
		                    >
		                      <table
		                        cellpadding="0"
		                        cellspacing="0"
		                        width="100%"
		                        border="0"
		                        style="
		                          color: #000;
		                          font-family: URWDIN;
		                          font-size: 13px;
		                          line-height: 22px;
		                          table-layout: auto;
		                          width: 100%;
		                          border: none;
		                        "
		                      >
		                        <tbody>
		                          <tr>
		                            <td
		                              valign="top"
		                              class="m_-5146143764419861847list-title"
		                            >
		                              Account:
		                            </td>
		                            <td
		                              valign="top"
		                              class="m_-5146143764419861847list-content"
		                            >
		                              <a
		                                href="${options.email}"
		                                target="_blank"
		                                >aydinzarifieaszo@gmail.com</a
		                              >
		                            </td>
		                          </tr>
		                          <tr>
		                            <td
		                              valign="top"
		                              class="m_-5146143764419861847list-title"
		                            >
		                              IP Address:
		                            </td>
		                            <td
		                              valign="top"
		                              class="m_-5146143764419861847list-content"
		                            >
		                              5.122.183.29
		                            </td>
		                          </tr>
		                          <tr>
		                            <td
		                              valign="top"
		                              class="m_-5146143764419861847list-title"
		                            >
		                              Login Platform:
		                            </td>
		                            <td
		                              valign="top"
		                              class="m_-5146143764419861847list-content"
		                            >
		                              ANDROID
		                            </td>
		                          </tr>
		                          <tr>
		                            <td
		                              valign="top"
		                              class="m_-5146143764419861847list-title"
		                            >
		                              Login Time:
		                            </td>
		                            <td
		                              valign="top"
		                              class="m_-5146143764419861847list-content"
		                            >
		                              2021-09-06 15:18:44 (UTC+08:00)
		                            </td>
		                          </tr>
		                        </tbody>
		                      </table>
		                    </td>
		                  </tr>
		                </tbody>
		              </table>
		            </div>
		          </td>
		        </tr>
		      </tbody>
		    </table>
		  </div>

		    </div>
		    <p
		      style="
		        text-align: left;
		        font-family: URWDIN;
		        font-size: 14px;
		        line-height: 22px;
		        text-align: left;
		        color: rgba(1, 8, 30, 0.6);
		        padding: 0 10px 0 10px;
		      "
		    >
		      Notice: If you did not conduct this operation, your account may be
		      compromised.  Please log in to your account and change your password or
		      freeze your account immediately
		    </p>
		  </div>
		</div>`,
		// attachments: [
		// 	{
		// 		filename: 'bunnybunny.jpg',
		// 		path: './public/images/bunnybunny.jpg',
		// 		cid: 'myImage', // Content ID of the image
		// 	},
		// ],
	};

	// 3) send email
	await transporter.sendMail(mailOptions);
	console.log('Transporter sent!');
};

module.exports = sendEmail;
