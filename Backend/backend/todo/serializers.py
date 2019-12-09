from django.contrib.auth.models import User
from rest_framework import serializers
from todo.models import Todo,Item

class UserSerializer(serializers.ModelSerializer):
    to_do_list = serializers.PrimaryKeyRelatedField(many=True, queryset=Todo.objects.all())
    class Meta:
        model = User
        fields = ['id','username', 'email','to_do_list']

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id','name', 'description', 'deadline','status']

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id','name','owner','items']

class TodosSerializer(serializers.ModelSerializer):
    item_set = serializers.SerializerMethodField()
    class Meta:
        model = Todo
        fields = ['id','name','owner','item_set']
    def get_item_set(self, instance):
        items = instance.items.all().order_by('-deadline')
        return ItemSerializer(items, many=True).data
        

class RegisterSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(
        write_only=True,
        required=True,
        help_text='Leave empty if no change needed',
        style={'input_type': 'password', 'placeholder': 'Password'})
    class Meta:
        model = User
        fields = ['username','password', 'password2','email']
        extra_kwargs ={'password':{'write_only':True,'required':True}}
    def save(self):

        password =  self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password':'Passwords must match'})
        user = User.objects.create(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
        )
          
        user.set_password(password)
        user.save()
        return user

#{"username":"kubilay",
#"password":"07acer71",
#"email":"kubilay@gmail.com"
#}