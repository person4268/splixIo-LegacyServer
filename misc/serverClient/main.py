import websocket
import _thread as thread
from termcolor import colored
 
def send(*args):
    

def onmessage(ws, message):
    print(colored(message, "blue"))

def onerror(ws, error):
    pass

def onclose(ws):
    pass

def onopen(ws):
    thread.start_new_thread(run, ())

def run(*args):
    send(ws, "This is a test")

if __name__ == "__main__":
    #websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://echo.websocket.org/", on_message = onmessage, on_error = onerror, on_close = onclose)
    ws.on_open = onopen
    ws.run_forever()
