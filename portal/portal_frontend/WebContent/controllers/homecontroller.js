/**
 * 
 */
app.controller('HomeController',function($scope,$location,NotificationService,$rootScope){
	NotificationService.getAllNotification().then(
			function(response){
			     $rootScope.notifications=response.data
			     $rootScope.notificationsCount=$rootScope.notifications.length
			},
			function(response){
				$rootScope.error=response.data
				if(response.status==401)
					$location.path('/login')
			})
			
})
