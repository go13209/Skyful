from django import template

register = template.Library()


@register.filter(name="unread_notifications")
def unread_notifications(user):
    return user.notification_set.filter(is_read=False).order_by("-created_at")
