from apps.blog.exceptions import PostNotFound  


def test_post_not_found_exception():
    exception = PostNotFound()

    assert exception.status_code == 404

    assert str(exception) == "The requested post doesn't exist..."

