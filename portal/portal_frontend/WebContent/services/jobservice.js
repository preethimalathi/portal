/**
 * job service
 */
app.factory('JobService',function($http){
	var jobService={}
	var BASE_URL = "http://localhost:9090/portal_middleware"
	jobService.addJob=function(job){
		return $http.post(BASE_URL + "/addjob",job)
	}
	
	jobService.getAllJobs=function(){
		return $http.get(BASE_URL + "/getalljobs")  //$scope.jobs=response.data
	}
	
	jobService.getJob=function(id){
		return $http.get(BASE_URL + "/getjob/"+id) //@PathVarible in Middleware
	}
	return jobService;
})
