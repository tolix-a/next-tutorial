self.addEventListener('install',function(){
   console.log('fcm sw install...');
   self.skipWaiting();
});

self.addEventListener('push',function(e){
   // console.log(e.data.json().data, 'push event....');

   const data = e.data.json().data;
   const option = {
      body:data.body,
      icon:data.icon,
      image:data.image,
      badge:'',
      vibrate:[200,100,300],
      data:{
         click_action:data.click_action
      },
      tag:'tag tag'
   }

   e.waitUntil( 
      self.registration.showNotification(data.title, option)
   );
});

self.addEventListener('notificationclick',function(e){
   const url = e.notification.data.click_action;

   e.waitUntil(
      clients
      .matchAll({
         type: "window",
      })
      .then(function (clientList) {
         for (var i = 0; i < clientList.length; i++) {
         var client = clientList[i];
         if (client.url == "/" && "focus" in client) return client.focus();
         }
         if (clients.openWindow) return clients.openWindow(url);
      }),
   );
})