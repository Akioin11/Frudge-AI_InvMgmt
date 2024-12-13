import os
import google.generativeai as genai

API_KEY = "AIzaSyBd3rFfaIIwEkRlmQYy2Dbs2iBcgVXefW8";
genai.configure(api_key=API_KEY)

#myfile = genai.upload_file("C:/Users/Aksha/Desktop/eathren.jpg")
#print(f"{myfile=}")
#myfile1 = "https://i.ibb.co/zFZwXsS/eathren.jpg"

model = genai.GenerativeModel("gemini-1.5-flash")
result = model.generate_content(
    [myfile1, "\n\n", "whats the photo about?"]
)
print(result.text)