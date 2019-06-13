from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser,
    PermissionsMixin)


class MyUserManager(BaseUserManager):
    def create_user(self, email, nickname, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=MyUserManager.normalize_email(email),
            nickname=nickname,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        u = self.create_user(email=email,
                             password=password,
                             )
        u.is_admin = True
        u.save(using=self._db)
        return u


class MyUser(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=250, null=True)
    token = models.CharField(max_length=800, null=True)
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    nickname = models.CharField(
        u'닉네임',
        max_length=10,
        blank=True,
        unique=False,
        null=True,
        default='')
    # avatar = models.ImageField(
    #     null=True,
    #     blank=True,
    #     upload_to='image/avatar/',
    # )

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'

    # REQUIRED_FIELDS = ['nickname']

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class MyBookmark(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="bookmark")
    headline = models.CharField(max_length=500)
    pub_date = models.DateField()
    web_url = models.CharField(max_length=800)
    image_url = models.CharField(max_length=800, null=True, blank=True)
    
    


