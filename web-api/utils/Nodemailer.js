const nodemailer = require("nodemailer");

const { MAIL_USERNAME, MAIL_PASSWORD, OAUTH_CLIENTID, OAUTH_CLIENT_SECRET,OAUTH_REFRESH_TOKEN } = require('../config')

const sendEmail = async (action,email, subject, text, uniqueString ) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        type: 'OAuth2',
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
        clientId: OAUTH_CLIENTID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN
      }

    });

    if (action == 'createUser'){

        await transporter.sendMail({
            from: MAIL_USERNAME,
            to: email,
            subject: subject,
            html: `Press <a href=https://mtg-card-store.herokuapp.com/users/verify/${uniqueString}> here </a> to verify your email at Bastion Games. Thank you`,
          });
          console.log("email sent sucessfully");

    }

    else if (action == 'resetPassword'){

    await transporter.sendMail({
      from: MAIL_USERNAME,
      to: email,
      subject: subject,
      html: `Press <a href=${text}> here </a> to reset your Bastion Games Account. Thank you`,
    });
    }

    else if (action == 'resetPasswordConfirmation'){

        await transporter.sendMail({
          from: MAIL_USERNAME,
          to: email,
          subject: subject,
          html: `Hello ${text}, Password successfully reset! `,
        });
        }

        else if (action == 'orderCreatedEmployee'){

            //create list to send as HTML with order details

            let body = [];

            for (const product of text.products){
                body.push(`<li> ${product.name ? product.name : product.productName},
                Category: ${product.set_name ? product.set_name : product.productCategory}
                , Quantity: ${product.quantity} , Price:$ ${product.price} </li>`)
            }

            await transporter.sendMail({
              from: MAIL_USERNAME,
              to: MAIL_USERNAME,
              subject: subject,
              html: `User ${email}, has placed an order, please review it on the employee dashboard <br>
              Created at: ${text.updatedAt} <br>
               Order Id: ${text._id} <br>
               Order Total: ${text.total} <br>
               Products Ordered: 
               <ul>
               ${body.join('')}
               </ul>
              `
            });
            }

            else if (action == 'orderCreatedCustomer'){

                let body = [];

                for (const product of text.products){
                    body.push(`<li> ${product.name ? product.name : product.productName},
                    Category: ${product.set_name ? product.set_name : product.productCategory}
                    , Quantity: ${product.quantity} , Price:$ ${product.price} </li>`)
                }

                await transporter.sendMail({
                  from: MAIL_USERNAME,
                  to: email,
                  subject: subject,
                  html: `Thank you ${email}, your order has been submitted and will be reviewed by one of our employees shortly <br>
                  Created at: ${text.updatedAt} <br>
                   Order Id: ${text._id} <br>
                     Order Total: ${text.total} <br>
                     Products Ordered: 
                     <ul>
                     ${body.join('')}
                     </ul>
                  `
                });
                }

                else if (action == 'orderApproval'){

                    let body = [];

                    for (const product of text.products){
                        body.push(`<li> ${product.name ? product.name : product.productName},
                        Category: ${product.set_name ? product.set_name : product.productCategory}
                        , Quantity: ${product.quantity} , Price:$ ${product.price} </li>`)
                    }

    
                    await transporter.sendMail({
                      from: MAIL_USERNAME,
                      to: email,
                      subject: subject,
                      html: `Your order has been approved! Please pick it up at our store at your earliest convenience<br>
                      Order Approved : ${text.updatedAt} <br>
                       Order Id: ${text._id} <br>
                         Order Total: ${text.total} <br>
                         Products Ordered: 
                         <ul>
                         ${body.join('')}
                         </ul>
                      `
                    });
                    }


    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;