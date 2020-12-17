
gpio: main.o
	gcc -Wall main.o -lgpiod -o gpio

main.o: main.c
	gcc -Wall -g -c main.c

all: gpio

clean:
	rm -rf gpio main.o