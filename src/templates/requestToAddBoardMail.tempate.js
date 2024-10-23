
const requestToAddBoardMail = ({
    fromEmail,
    boardName,
    boardLink,
    fromUserName,
  }) => {
    return `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; border: 1px solid #ddd;">
          <img src="https://i.ibb.co/PNgfsXP/unnamed-2.png" alt="Trello Logo" style="display: block; margin-bottom: 20px;">
          <p style="font-size: 16px; line-height: 1.5;">
              ${fromUserName} wants to join your board ${boardName}
          </p>
          <p style="font-size: 16px; line-height: 1.5;">
              Adding ${fromEmail} to your board allows them to edit cards and change some board settings.
          </p>
  <a href="${boardLink}" style="display: block; width: 80px; padding: 10px 20px; background-color: #0079BF; color: #fff; text-decoration: none; border-radius: 5px;">Go to board</a>    </div>
    `;
  };

  module.exports = {
    requestToAddBoardMail,
  };
  