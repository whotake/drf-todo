from django.conf.urls import url, include

from rest_framework import routers
from rest_framework.authtoken import views


from tasks import views as tasks
from authorization import views as us
from .views import index

router = routers.DefaultRouter()
router.register(r'users', us.UserViewSet)
router.register(r'tasks', tasks.TasksViewSet, 'Tasks')

urlpatterns = [
    url(r'^api/', include(router.urls)),
    # url(r'^api_auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^', index, name='index'),
]
