from datetime import datetime
import time as t

#Is currently in Python but will be changed to javascript later today 

def get_current_time():
    """
    Returns the current local time as a datetime.time object.
    """
    current_datetime = datetime.now()
    current_time = current_datetime.time()
    return current_time

# Example usage:
with open("database.txt", 'r') as file:

    #Lines 18 - 22 is the scheduler. It is set to run at 12:00 pm everyday
    x = 1
    while x == 1:
        t.sleep(10)
        current_local_time = get_current_time()
        if current_local_time.hour == 12 and current_local_time.minute == 00:

            #Will use a txt file as a database for now. Can be modified for other databases
                for line in file:

                    data_line = line.split(',')
                    #Each line if the file holds data for one person and will look like this:
                    #["Name", "Paid or Unpaid", "Days unpaid", "Amount Due", "Phone Number", "Address"]

                    #0 means unpaid. Program will make call if this attribute is 0.
                    if data_line[1] == 0:

                        #Escalation Logic. data_line[2] contains a number which indicates what course of action the AI will take.
                        if data_line[2] == 1:
                            #Call customer and give calm reminder

                            #retry logic. Code will not leave this while loop until the call is successful. Repeated for strict reminder.
                            while (successful_call == 0):
                                #retry call

                            data_line[2] += 1

                        elif data_line[2] == 2:
                            #Call customer and give strict reminder

                            while (successful_call == 0):
                                #retry call
                            
                            data_line[2] += 1

                        elif data_line[2] >= 3:
                            #Contact upper managment
                            data_line[2] += 1
        file.seek(0)

                
                        

                    