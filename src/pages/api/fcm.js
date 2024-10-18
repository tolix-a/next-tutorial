import admin from 'firebase-admin';

export default async function handler(req,res){
  const serviceAccount = {
    projectId:'test-713fd',
    privateKey:'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZs+ZDkNJUvZ7l\n2ojPSxEXeeZJ0VSMY1gMAwU4DBQgr9ovBcDqv6wtqPKExkihrhhC0tm68cz9CzZm\nvu4ZWKcpJ0vZKKpN1JNgQD+MYjORlisu752vMzNtm5l3PO0ivuNfeZ8P/OTLTx/f\n/LNUEY305f/DlBOFReRa3St1I0725cQJqBHz6bwxlkT62X+t0WRcsjkcP/j5tvFF\n0fWfpwpd81zzs2dulVY79ItcOCaAjpVidh+OLH6HH15CQiU4BlwNdp657957KLjr\nrNbdeFdGqeXnsZhsF2qB7vh1f4VhbytQ3hR0eZZjDQd+mNJhsks2VGgezrP97h1t\n1DGpSSI7AgMBAAECggEAPvO5yc6U9vQ7EnVxN0XNmEnrEizUbjN6KmFKT+xSihi8\nSioXG46pnIHn4o27zcyaTzRAzRqgFLv06hwlNOhkfqyDmkvXhM0eF3v5CyxlZqmU\nwkKN2OYlmCz0rCueDG8WfVI43bl8k/CyY3ECmdoexEE3ggkx/ZHkt3qChBWUD/bk\nyUaXskTt/QmzrbhFaI384WheV/e39c7zbdYwWUCEHIoAsqopSEApXZhDKs39fIhs\nH9s2Q/8JTK3CoHwhTshdTGM50w3SkUzTuNlApCe/fKhSqozHokvbX+FPx5LN/KBA\nykAKA+a9WqAVV6gaIrw4nr4zpVRVouObP3j3PDmhkQKBgQDL0uqhSX45IY71q3Hk\nJ1KR1hLvVHMaHq3DWUd5iM6fLLxOm/eBmT55SiEuM8cBLDUZA3SA3xP0ihiOMZaR\nBTOKkePMQ+knzgD7baLhSxe1i+C0CTlZosAe90aPLssTMhS8J8k+4Z24ee94kX/l\nxbFZ7+JES9E8qgVLXxHGhJOAnQKBgQDBDGtfOSsOdcGavJGs4Bgv+l+762l0WP7n\nzF2je8yFsiObczs4nPXL0WcDU1lH3lrkHXjuIx04ENXCcYr2nVuyXWle+xgJcwpu\nkJbUdsXYTFOp5aWkGbUC/AL2JxLZsGjcNH/Ibo1/GM6qh5GSrw5IIbNLhdpIi5OJ\naU3xPtVatwKBgET7KPVVDib/uIZkc7Mnq8Y3kUj2Z84bO+u1N39mUaeFWGWyW129\nI2uhLwGX/G3lLEM+7BsBZJuKcS0Ok0qZXAw1u8bR5QLXsXVmcY2WAHwszuufg41W\ni3bvcS3cRFZGyMW1IWLqsJpSij1f4M0+zvsFOKqsji/dytTrY/SvwcvxAoGAY0Vk\nrYnzVzM8xLp1WuW96mYg9rye9OKS6lYQTPJrgNDTOKvv5zPnvdDH3VDuF2QDb0ys\nlCDgdKVLlvrWT+0pazZX6izK9oj+805NEaKmKI1PdI2QOSuzBn7bcwMy0VjDA4HH\nuCUJhDMYi169gCWe/X6++XYygp2r17ycBROfmU8CgYEAh9Isj+9+AZ3Vp8yxlmEm\nGjCESSEwfWlFn7L9otQKI4fN7EYax6kSGXLr4z2+SIlUBS7Yszn67cGclhLI+I/b\nvqkHNUyvX52t8HxfQ+WDf7L+SJbq6llVG75DfBIVAVhUeLqaVm+mnkXafgMIJTMy\n2cTEDJ04DbSNOz1Dl6ZHRH0=\n-----END PRIVATE KEY-----\n',
    clientEmail:'firebase-adminsdk-2bk15@test-713fd.iam.gserviceaccount.com'
  }
  admin.initializeApp(
    {credential:admin.credential.cert(serviceAccount)}
  );

  const msg = await admin.messaging().send(req.body);

  res.status(200).send('FCM 메세지 발송 완료!...');
};