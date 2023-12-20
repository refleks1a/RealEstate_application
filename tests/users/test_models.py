import pytest


def test_user_str(base_user):
    """Test custom user model's __str__ representation"""
    assert base_user.__str__() == f"{base_user.username}"


def test_user_short_name(base_user):
    """Test user model's get_short_name method"""
    assert base_user.get_short_name() == f"{base_user.username}"


def test_user_full_name(base_user):
    """Test user model's get_full_name method"""
    assert base_user.get_full_name == f"{base_user.first_name} {base_user.last_name}" 


def test_base_user_email_is_normalized(base_user):
    """Test new user's email is normalized"""
    email = "alpha@REALESTATE.COM"
    assert base_user.email == email.lower()


def test_super_user_email_is_normalized(super_user):
    """Test super user's email is normalized"""
    email = "alpha@REALESTATE.COM"
    assert super_user.email == email.lower()


def test_super_user_is_staff(user_factory):
    """Test admin user has is_staff == False"""
    with pytest.raises(ValueError) as err:
        user_factory.create(is_superuser=True, is_staff=False)
    assert str(err.value) == "Superusers must have is_staff=True"   


def test_super_user_is_not_superuser(user_factory):
    """Test admin user has is_superuser=False"""
    with pytest.raises(ValueError) as err:
        user_factory.create(is_superuser=False, is_staff=True)
    assert str(err.value) == "Superusers must have is_superuser=True"       


def test_create_user_with_no_email(user_factory):
    """Test creating new user without an email gives an error"""
    with pytest.raises(ValueError) as err:
        user_factory.create(email=None)
    assert str(err.value) == "Base User Account: An email address is required"  


def test_create_user_with_no_username(user_factory):
    """Test creating new user without a username gives an error"""
    with pytest.raises(ValueError) as err:
        user_factory.create(username=None)
    assert str(err.value) == "Users must submit a username"  


def test_create_user_with_no_firstname(user_factory):
    """Test creating new user without a firstname gives an error"""
    with pytest.raises(ValueError) as err:
        user_factory.create(first_name=None)
    assert str(err.value) == "Users must submit a first name" 


def test_create_user_with_no_lastname(user_factory):
    """Test creating new user without a lastname gives an error"""
    with pytest.raises(ValueError) as err:
        user_factory.create(last_name=None)
    assert str(err.value) == "Users must submit a last name" 

 
def test_create_super_user_with_no_email(user_factory):
    """Test creating superuser without an email"""
    with pytest.raises(ValueError) as err:
        user_factory.create(email=None, is_superuser=True, is_staff=True)
    assert str(err.value) == "Admin Account: An email address is required" 


def test_create_super_user_with_no_password(user_factory):
    """Test creating superuser without a password"""
    with pytest.raises(ValueError) as err:
        user_factory.create(password=None, is_superuser=True, is_staff=True)
    assert str(err.value) == "Superusers must have a password" 


def test_user_email_incorrect(user_factory):
    """Test non valid email is provided"""
    with pytest.raises(ValueError) as err:
        user_factory.create(email="real-estate.com")
    assert str(err.value) == "You must provide a valid email address" 
