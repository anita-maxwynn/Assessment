# Database Schema Documentation

This schema describes the structure of the database for the Me-API Playground project. Each model is linked to the user's profile and supports storing candidate information.

---

## Profile
- **id**: AutoField (Primary Key)
- **name**: CharField (max_length=100)
- **email**: EmailField (unique)
- **bio**: TextField (optional)
- **profilePic**: ImageField (optional, uploads to 'profile_pics/')
- **created_by**: OneToOneField to User (Django auth)

## Education
- **profile**: ForeignKey to Profile
- **degree**: CharField (max_length=100)
- **institution**: CharField (max_length=200)
- **start_year**: IntegerField
- **end_year**: IntegerField (optional)

## Skill
- **profile**: ForeignKey to Profile
- **name**: CharField (max_length=100)
- **level**: CharField (max_length=50, optional)

## Project
- **profile**: ForeignKey to Profile
- **title**: CharField (max_length=200)
- **description**: TextField
- **link**: URLField (optional)
- **tech_stack**: ArrayField of CharField (max_length=100, optional)

## Work
- **profile**: ForeignKey to Profile
- **company**: CharField (max_length=200)
- **role**: CharField (max_length=100)
- **start_date**: DateField
- **end_date**: DateField (optional)
- **description**: TextField (optional)

## Link
- **profile**: ForeignKey to Profile
- **type**: CharField (max_length=50)  # e.g., GitHub, LinkedIn, Portfolio
- **url**: URLField

---

### Relationships
- Each Profile can have multiple Education, Skill, Project, Work, and Link entries.
- All related models use ForeignKey to Profile for association.

### Notes
- Uses Django's built-in User model for authentication.
- Images for profile pictures are stored in the `media/profile_pics/` directory.
- `tech_stack` in Project uses PostgreSQL's ArrayField for storing multiple technologies.

---

For migration details, see the `migrations/` folder.
