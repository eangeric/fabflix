# Demo Video Link

https://youtu.be/3TLtJK2gYb4

The video includes a voiceover for convenience

# Team Member Contributions

Eric Eang - Task 2, task 4, and some of task 3
Darrien Sao - Task 1, task 3, and some of task 4

# Substring matching design

To match substrings we used queries like

```
AND m.title LIKE ?
```

which used like combined with a prepared statement to replace the ? parameter along with the % symbol to match sequences of characters before and after

```
statement.setString(paramIndex++, "%" + requestedTitle + "%");
```

When matching for title we would do

```
queryBuilder.append(" AND m.title LIKE ?");
statement.setString(paramIndex++, requestedChar + "%");
```

to ensure that only matches sequences after the starting letter/number. For the \* symbol
we used REGEX to get titles startging with nonalphanumerical characters.

```
queryBuilder.append(" AND m.title NOT REGEXP '^[0-9a-zA-Z]'");
```

To see more of our design it is located in the SearchServlet.java file.
