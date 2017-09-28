//Used to manipulate courses from the data at http://web.uri.edu/catalog/course-descriptions/

# Get the speeds from user input
def everyOther():
    file = open('output.txt', 'w')
    num = 0
    with open('courses3.txt') as f:
        content = f.readlines()
    # you may also want to remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content]
    conHalf = []
    i = 0
    while i < len(content):
        conHalf.append(content[i])
        temp = content[i]
        content[i] = content[i] + ","
        #content[i] = temp[0] + temp[1] +"." + temp[2] + "." + temp[3] + "." + temp[4] + temp[5:]
        file.write("%s\n" % content[i])
        print(content[i])
        i += 1  
    

def flip():
    file = open('output.txt', 'w')
    with open('courses.txt') as f:
        content = f.readlines()
    # you may also want to remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content]
    conNext = []
    i = 0
    while i < len(content):
        temp = content[i]
        print(temp)
        content[i] = [temp[1], temp[0]]
        conNext.append(content[i])
        file.write("%s\n" % content[i])
        #print(content[i])
        i += 1

everyOther()
