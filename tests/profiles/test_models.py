import pytest


def test_profile_str(profile):
    """Test profile model's __str__ representation"""
    assert profile.__str__() == f"{profile.user.username}'s profile"