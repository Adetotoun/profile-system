## Intelligence Query Engine
-- A profile system with advanced filtering, sorting, pagination, and a natural language search endpoint.

## Parsing Approach
- Keyword matching (male, female, young, adult)
- Regex for numbers (above 30)
- Country dictionary mapping

## Example:
- "young males from nigeria"
 --- → gender=male
 --- → min_age=16
 --- → max_age=24
 --- → country_id=NG

## Limitations
- Doesn’t understand complex grammar
- No synonyms ("guys", "ladies")
- Only supports predefined countries
- Cannot handle multiple conditions like:
- "between 20 and 30"

**Base URL**

**Example Endpoints**
/api/profiles?gender=female&min_age=25

/api/profiles/search?q=aadultg females from nigeria