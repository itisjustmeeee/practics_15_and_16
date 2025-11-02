

__version__ = 'Version: 2'
from tkinter import *
import random
import string
from tkinter import filedialog as fd

root = Tk()
root.resizable(width=False, height=False)
root.title("Генератор паролей  " +str(__version__))
root.geometry("450x330+500+200")
calculated_text = Text(root,height=15, width=50)

def erase():   
    calculated_text.delete('1.0', END)

chars = '_+-/*!&$#?=@<>abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

x = 0
def password():
    for n in range(int(number_entry.get())):       
        password =''
        global x
        x += 1
        for i in range(int(length_entry.get())):
            password += random.choice(chars)
        if x<=9:
            calculated_text.insert(END,"пароль" + '' + str(x) + ': ' + password + "\n")
        else:
            calculated_text.insert(END,"пароль" + '' + str(x) + ': ' + password + "\n")

def savepass():
    file_name = fd.asksaveasfilename(filetypes=(("TXT files", "*.txt"),                                       
                                                ("All files", "*.*")),defaultextension='')
    f = open(file_name, 'w')
    s = calculated_text.get(1.0, END)
    f.write(s)
    f.close()
        
display_button = Button(text="Сгенерировать", command=password)
erase_button = Button(text="Очистить", command=erase)
save = Button(text="Сохранить", command=savepass)

number_entry = Entry(width=10, justify=CENTER)
length_entry = Entry(width=10, justify=CENTER)
number_entry.insert(0, " ")
length_entry.insert(0, " ")
    
number_label = Label(text="      Количество паролей")
length_label = Label(text="      Длина пароля")
number_label.grid(row=0, column=0, sticky="w")
length_label.grid(row=1, column=0, sticky="w")
number_entry.grid(row=0,column=1, padx=1, pady=5)
length_entry.grid(row=1,column=1, padx=1, pady=5)

save.grid(row=3, column=2, padx=50, pady=5, sticky="w")
display_button.grid(row=3, column=0, padx=30, pady=5, sticky="e")
erase_button.grid(row=3, column=1, padx=30, pady=5, sticky="e")

scrollb = Scrollbar(root, command=calculated_text.yview)
scrollb.grid(row=4, column=3, sticky='nsew')
calculated_text.grid(row=4, column=0, sticky='nsew', columnspan=3)
calculated_text.configure(yscrollcommand=scrollb.set)

root.mainloop()




































































