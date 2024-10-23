const shareBoardMail = ({ hostName, boardName, boardLink, note }) => {
  return `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f2f2f2;">
          <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://i.ibb.co/PNgfsXP/unnamed-2.png" alt="Trello Logo" style="display: block; width: 100px; height: auto; margin: 0 auto;">
          </div>
          <div style="padding: 20px; background-color: #fff; border-radius: 5px;">
              <div style="margin-bottom: 20px;">
                  <h2>${hostName} invited you to their board</h2>
                  <h2>${boardName}</h2>
              </div>
              <div style="margin-bottom: 20px;">
                  Join them on Trello to collaborate, manage projects, and reach new productivity peaks.
              </div>
              <a href="${boardLink}" style="display: block; width: 80px; padding: 10px 20px; background-color: #0079BF; color: #fff; text-decoration: none; border-radius: 5px;">Go to board</a>
               ${
                 note
                   ? `
                <div style="margin-bottom: 20px; margin-top: 5px; padding: 6px; padding-left: 10px; background-color: #f2f2f2;">
                  <h3>A note from ${hostName}</h3>
                  <p>${note}</p>
                </div>
              `
                   : ''
               }
              <div style="margin-bottom: 20px; margin-top: 20px">
                  What is Trello? Imagine a white board, filled with lists of sticky notes, with each note as a task. Now imagine that each of those sticky notes has photos, attachments from other data sources like Jira or Salesforce, documents,   
   due dates, and more.
              </div>
              <div style="margin-bottom: 20px;">
                  Now imagine that you can take that whiteboard anywhere you go on your smartphone, and can access it from any computer through the web. That's Trello!
              </div>
          </div>
      </div>
    `;
};

module.exports = {
  shareBoardMail,
};
