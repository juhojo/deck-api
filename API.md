# DeckAPI - API reference

The interface's methods and the schemas of the database's tables are described in this document.

Table of contents:
- [DeckAPI - API reference](#deckapi---api-reference)
	- [Methods](#methods)
	- [Tables](#tables)
		- [Cards](#cards)
		- [Decks](#decks)
		- [Decks_Cards](#decks_cards)
		- [Ranks](#ranks)
		- [Suits](#suits)
	- [The order of cards in a new deck](#the-order-of-cards-in-a-new-deck)

## Methods

| endpoint          | method | params                                                 |                                                        description |
| :---------------- | :----- | :----------------------------------------------------- | -----------------------------------------------------------------: |
| /deck             | POST   | -                                                      |                                                  Create a new deck |
| /deck/:id         | GET    | **id**: ID of deck                                     | Get info of deck (e.g. number of cards in deck, remaining cards..) |
| /deck/:id         | DELETE | **id**: ID of deck                                     |                                                      Delete a deck |
| /deck/:id/shuffle | PUT    | **id**: ID of deck                                     |                         Shuffle the cards in deck, and update deck |
| /deck/:id/deal/:n | PUT    | **id**: ID of deck<br>**n**: how many cards are dealed |                            Deal n-cards from deck, and update deck |

## Tables

### Cards

*A card can have one suit and rank, and can only belong to a single deck.*

```mysql
CREATE TABLE Cards (
	cardId int UNSIGNED NOT NULL AUTO_INCREMENT,
	deckId int UNSIGNED NOT NULL,
	suitId int UNSIGNED NOT NULL,
	rankId int UNSIGNED NOT NULL,
	PRIMARY KEY (cardId),
	FOREIGN KEY (deckId) REFERENCES Decks(deckId)
		ON DELETE CASCADE,
	FOREIGN KEY (suitId) REFERENCES Suits(suitId)
		ON DELETE CASCADE,
	FOREIGN KEY (rankId) REFERENCES Ranks(rankId)
		ON DELETE CASCADE
);
```

### Decks

```mysql
CREATE TABLE Decks (
	deckId int UNSIGNED NOT NULL AUTO_INCREMENT,
	shuffled int UNSIGNED DEFAULT 0,
	joker int UNSIGNED DEFAULT 0,
	ad int UNSIGNED DEFAULT 0,
	PRIMARY KEY (deckId)
);
```

### Decks_Cards

*A junction table for decks and cards.*

```mysql
CREATE TABLE Decks_Cards (
	deckId int UNSIGNED NOT NULL,
	cardId int UNSIGNED NOT NULL,
	PRIMARY KEY (deckId, cardId),
	FOREIGN KEY (deckId) REFERENCES Decks(deckId)
		ON DELETE CASCADE,
	FOREIGN KEY (cardId) REFERENCES Cards(cardId)
		ON DELETE CASCADE
);
```

### Ranks

*The numeric value of the card and its calling name (label), for example, "Ace".*

```mysql
CREATE TABLE Ranks (
	rankId int UNSIGNED NOT NULL AUTO_INCREMENT,
	label varchar(31),
	value int,
	PRIMARY KEY (rankId)
);
```

### Suits

*The suit of the card. The suit is described with color and label. Description offers additional info.*

```mysql
CREATE TABLE Suits (
	suitId int UNSIGNED NOT NULL AUTO_INCREMENT,
	label varchar(31),
	description varchar(255),
	colour int,
	PRIMARY KEY (suitId)
);
```

## The order of cards in a new deck

The order (and the quantity) of the cards in an unsuffled deck depends on the `joker` and `ad` attributes. For the list below, both of these attributes are set to `1` (default is `0`). Setting the `joker` attribute to `0` would mean that the `Ace of Spades` card is the first to be pulled. Setting the `ad` attribute to `0` would mean that the total number of cards in a deck would be reduced from 56 to 54.

1. Joker 1
2. Joker 2
3. Ace of Spades
4. 2 of Spades
5. 3 of Spades
6. 4 of Spades
7. 5 of Spades
8. 6 of Spades
9. 7 of Spades
10. 8 of Spades
11. 9 of Spades
12. 10 of Spades
13. Jack of Spades
14. Queen of Spades
15. King of Spades
16. Ace of Diamonds
17. 2 of Diamonds
18. 3 of Diamonds
19. 4 of Diamonds
20. 5 of Diamonds
21. 6 of Diamonds
22. 7 of Diamonds
23. 8 of Diamonds
24. 9 of Diamonds
25. 10 of Diamonds
26. Jack of Diamonds
27. Queen of Diamonds
28. King of Diamonds
29. King of Clubs
30. Queen of Clubs
31. Jack of Clubs
32. 10 of Clubs
33. 9 of Clubs
34. 8 of Clubs
35. 7 of Clubs
36. 6 of Clubs
37. 5 of Clubs
38. 4 of Clubs
39. 3 of Clubs
40. 2 of Clubs
41. Ace of Clubs
42. King of Hearts
43. Queen of Hearts
44. Jack of Hearts
45. 10 of Hearts
46. 9 of Hearts
47. 8 of Hearts
48. 7 of Hearts
49. 6 of Hearts
50. 5 of Hearts
51. 4 of Hearts
52. 3 of Hearts
53. 2 of Hearts
54. Ace of Hearts
55. Ad card 1
56. Ad card 2
