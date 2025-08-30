from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrReadOnly(BasePermission):
    """
    Only owners can update or delete. Others can read.
    """

    def has_object_permission(self, request, view, obj):
        # Safe methods like GET, HEAD, OPTIONS are always allowed
        if request.method in SAFE_METHODS:
            return True
        
        # Otherwise, only allow if the object belongs to the user
        if hasattr(obj, "created_by"):
            return obj.created_by == request.user
        if hasattr(obj, "profile"):  # for nested models like Education, Skill, etc.
            return obj.profile.created_by == request.user
        return False
