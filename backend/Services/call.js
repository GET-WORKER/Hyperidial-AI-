const fs = require("fs");

// Function to get current local time
function getCurrentTime() {
  const now = new Date();
  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds()
  };
}

// Example usage
function processDatabase() {
    //Will use a json file as a database for now. Can be modified for other databases like sql
  fs.readFile("numbers.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const lines = data.trim().split("\n");

    lines.forEach((line, index) => {
      let dataLine = line.split(",");

      // Each line if the file holds data for one person and will look like this:
      // ["Name", "Paid or Unpaid", "Days unpaid", "Amount Due", "Phone Number", "Address"]

      let paidStatus = parseInt(dataLine[1]); // 0 = unpaid
      let daysUnpaid = parseInt(dataLine[2]);

      if (paidStatus === 0) 
      {
        if (daysUnpaid === 1) 
        {
          // Call customer and give calm reminder
          let successfulCall = 0;
          //Call function here
          while (successfulCall === 0) {
            // retry call

            //if call is successful
            successfulCall = 1; 
          }
          //Escalation logic. increment "daysUnpaid" attribute in database
          dataLine[2] = (daysUnpaid + 1).toString();
        } 
        else if (daysUnpaid === 2) 
        {
            // Call customer and give strict reminder
          let successfulCall = 0;
          while (successfulCall === 0) {
            // retry call
            
            //if call is successful
            successfulCall = 1; 

          }
          // escalation logic
          dataLine[2] = (daysUnpaid + 1).toString();
        } 
        else if (daysUnpaid >= 3) 
        {
          // Contact upper management
          dataLine[2] = (daysUnpaid + 1).toString();
        }

        // Update line in memory (could later be written back to file)
        lines[index] = dataLine.join(",");
      }
    });

    // Write updated database back to file
    fs.writeFile("database.txt", lines.join("\n"), (err) => {
      if (err) console.error("Error writing file:", err);
    });
  });
}

// Lines 80 - 85 is the scheduler. It is set to run at 12:00 pm everyday.
// Run check every 10 seconds in order to minimize memory usage of program.
setInterval(() => {
  const currentTime = getCurrentTime();
  if (currentTime.hour === 12 && currentTime.minute === 0) {
    processDatabase();
  }
}, 10000);
