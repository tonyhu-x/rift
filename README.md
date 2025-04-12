`profiles.json` represents nodes. Nodes are organized alphabetically.

Roles are specified in the `roles` attribute, which is an array or "any". If an array, permitted element values are "top", "jungle", "mid", "adc", "support". Elements are ordered in the order of preference for that role. Any number of roles may be omitted to indicate that the player does not normally pick those roles. "any" means the player is open to playing all five roles and does not have strong ordering preferences.

`relations.json` represents edges. Edges are organized alphabetically. Bidirectional edges are always specified such that the `id` that comes first when sorted alphebetically becomes the `from` field.
