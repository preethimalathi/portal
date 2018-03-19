/**
 * BlogPostDetailController
 * 
 */
app.controller('BlogPostDetailController', function($scope, $routeParams,
		$location, BlogService, $sce, $rootScope) {
	var id = $routeParams.id;
	
	BlogService.getBlog(id).then(function(response) {
		$scope.blogPost = response.data 
		$scope.title = $sce.trustAsHtml($scope.blogPost.blogTitle)
		$scope.content = $sce.trustAsHtml($scope.blogPost.blogContent);
	}, function(response) {
		$rootScope.error = response.data;
		if (response.status == 401)
			$location.path('/login')
	})
  
	BlogService.hasUserLikedPost(id).then(function(response) {
		if (response.data == '') {
			$scope.isLiked = false// glyphicon in black color
		} else {
			$scope.isLiked = true // glyphicon in blue color
		}
	}, function(response) {
		$rootScope.error = response.data;
		if (response.status == 401)
			$location.path('/login')
	})

	$scope.updateLikes=function(id){
		BlogService.updateLikes(id).then(
				function(response){
					$scope.blogPost=response.data
					$scope.isLiked=!$scope.isLiked
				},
				function(response){
					$rootScope.error = response.data;
					if (response.status == 401)
						$location.path('/login')
				})
	}
	$scope.showRejectionTxt=function(){
		$scope.isRejected=true;
	}
	$scope.blogApproved=function(id){
		BlogService.blogApproved(id).then(
				function(response){
					$location.path('/getblogs')
				},function(response){
					$rootScope.error=response.data;
					if (response.status == 401)
						$location.path('/login')
				})
	}
	$scope.blogRejected=function(id,rejectionReason){
		BlogService.blogRejected(id,rejectionReasin).then(function(response){
			$location.path('/getblogs')
		},function(response){
			$rootScope.error=response.data;
					if (response.status == 401)
						$location.path('/login')
		})
	}
	$scope.addComment=function(commentTxt,blogPost){
		blogComment={}
		blogComment.commentTxt=commentTxt
		blogComment.blogPost=blogPost;
		BlogService.addComment(blogComment).then(
				function(response){
						getAllBlogComments(id)
				},
				function(response){
					
					$rootScope.error = response.data;
					if (response.status == 401)
						$location.path('/login')
						else
							console.log(response.data)
				})
	}
	function getAllBlogComments(id){
		BlogService.getAllBlogComments(id).then(
			function(response){
				$scope.blogComments=response.data;
			},function(response){
				$rootScope.error = response.data;
				if (response.status == 401)
					$location.path('/login')
			
		})
	}
})
