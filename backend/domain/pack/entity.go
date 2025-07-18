package pack

type Pack struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	ImageURL    string `json:"imageUrl"`
	Description string `json:"description"`
	CreatedAt   string `json:"createdAt"`
}

type Item struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	ImageURL    string `json:"imageUrl"`
	Description string `json:"description"`
}
