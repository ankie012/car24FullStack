class SocialNetworks:
 def__init__(self): 
    self.graph={}
 
 def addConnection(self,userId1,userId2):
  #add users if they don't exit 
   if userId1 not in self.graph:
     self.graph[userId1]=[]
   if userId2 not in self.graph:
     self.graph[userId2]=[]

    #  for mutual connection 
   if userId2 not in self.graph[userId1]:
     self.graph[userId1].append(userId2)
   if userId1 not in self.graph[userId2]:
     self.graph[userId2].append(userId1) 



    
