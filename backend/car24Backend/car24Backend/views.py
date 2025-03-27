from django.http import HttpResponse

def hello_rupesh(request):
    return HttpResponse("""
        <script>console.log("Hello Rupesh from Django!");</script>
        <h1>Hello Rupesh, kaise ho? thik hai bhai or bato </h1> 
    """) 
