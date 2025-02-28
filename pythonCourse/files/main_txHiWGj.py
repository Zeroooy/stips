matrix = {

}

def createTable():
    for i in range(256):
        matrix[i] = (i*(i+1) >> 1) % 256

def f2(x):
    binary_list = []

    while x > 0:
        binary_list.append(x % 2)
        x = x // 2
    while len(binary_list) < 32:
        binary_list.append(0)

    binary_list.reverse()
    binary_list = [binary_list[0:8], binary_list[8:16], binary_list[16:24], binary_list[24:32]]

    binary_list2 = []
    for t in range(4):
        count = ""
        for i in range(len(binary_list[0])):
            count += str(binary_list[t][i])
        number = int(count, 2)
        finder = matrix[number]
        mini_binary_list = []
        while finder > 0:
            mini_binary_list.append(finder % 2)
            finder = finder // 2
        while len(mini_binary_list) < 8:
            mini_binary_list.append(0)

        for i in range(len(mini_binary_list)):
            binary_list2.append(mini_binary_list[i])

    count_str = ""
    for i in range(len(binary_list2)):
        count_str += str(binary_list2[i])

    return int(count_str, 2)



def f(x, key):
    move = (f2(x) + key) >> 3
    return f2(move)


def main(x, y, key, rounds):
    for i in range(rounds):
        result = y ^ f(x, key)

        y = x
        x = result
    return [x, y]




#L = int(input("input L0:"))
#R = int(input("input R0:"))
#key = input("input key:")
#phrase = input("input phrase:")
R = 1
key = 1
rounds = 12
phrase = "Hello!"


print("\nСоздание таблицы...")
createTable()
print("Таблица создана.\n")

print("Заданная фраза: " + phrase)
print("Ключ: " + str(key))
print("R: " + str(R))
print("Количество раундов: " + str(rounds) + "\n")

phrase_list = list(phrase)

crypt_list = []
r_list = []
for i in range(len(phrase_list)):
    res = main(R, ord(phrase_list[i]), key, rounds) #ord(phrase_list[i])
    crypt_list.append(chr(res[0]))
    r_list.append(res[1])

print("Зашифрованная фраза:")
print(crypt_list)
print("Ключи к ней:")
print(r_list)

phrase = ""
for i in range(len(phrase_list)):
    phrase += chr(main(ord(phrase_list[i]), r_list[i], key, rounds)[0])

print("\nРасшифрованная фраза:")
print(phrase)