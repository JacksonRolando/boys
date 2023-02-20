import json

boys_map = {}


def main():
    with open('./boys_map.json', 'r+') as f:
        global boys_map
        boys_map = json.load(f)

        op_str = input('''
        What do you want to do?

        options:
            search boyName - gets all attributes of said boy with their scores
            search boyName wordsToSearch - gets the score of a certain attribute for said boy
            list - lists boys to search through
            quit - saves the new boys data and exits the program
        
        your command: ''')

        opts = op_str.split(' ')

        if (opts[0] == 'search'):
            if (len(opts) > 1):
                boy = boys_map.get(opts[1])
                if (boy == 'None'):
                    print('boy not found')
                else:
                    if (len(opts) == 2):
                        attrib_str = ''
                        sum = 0
                        for attrib, score in boy:
                            sum += score
                            attrib_str += f'\tpoints: {score} - {attrib}\n'
                        print(f'{opts[1]} - total score: {sum}\n{attrib_str}')
                    else:
                        search_str = ' '.join(opts[3:])
                        print(search_str)


def search_attrib(boy, search):
    global boys_map
    boy_attribs = boys_map.get(boy)
    if (boy_attribs == None):
        return (-1, "no boy with that name")
    else:
        for i in range(len(boy_attribs)):
            if (search in boy_attribs[i][0]):
                return (i, boy_attribs[i][0])
        return (-1, 'attribute not found')


main()
