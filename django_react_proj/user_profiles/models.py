from django.contrib.auth.base_user import AbstractBaseUser


class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()
    STATUS_OPTIONS = (
        (0, 'inactive'),
        (1, 'active'),
        (2, 'banned')
    )

    email = EmailField(unique=True)
    name = CharField(max_length=32, blank=True)
    family_name = CharField(max_length=32, blank=True)
    date_of_birth = DateField(null=True, blank=True)
    #location =
    # languages =
    profile_picture = models.ImageField(upload_to='uploads/%Y/%m/%d/', default='images/defaultimg.jpg')
    phone_number = PhoneField(blank=True, help_text='Contact phone number')
    is_active = BooleanField(default=True)
    status = CharField(max_length=1, choices=STATUS_OPTIONS, default=STATUS_OPTIONS[0][0], blank=True)
    profile_setup = BooleanField(default=False)
    roles = ManyToManyField(Role, default=Role.ANONYMOUS, related_name='roles')
    is_staff = BooleanField(default=False)  # stupid mandatory field from Django
    gender = ForeignKey(Gender, on_delete=DO_NOTHING, null=True)
    created = DateTimeField(auto_now_add=True)
    modified = DateTimeField(auto_now=True)

    # REQUIRED_FIELDS = ['date_of_birth']
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.name, self.family_name])

    def get_age(self):
        if self.date_of_birth is not None:
            today = date.today()
            return today.year - self.date_of_birth.year - ((today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day))

        return None

    def get_roles_str(self):
        if self.roles is None:
            return ""
        return ', '.join(self.roles.all())

    class Meta:
        #swappable = 'AUTH_USER_MODEL'
        db_table = 'users'