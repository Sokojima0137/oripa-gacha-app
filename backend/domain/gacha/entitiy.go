package gacha

type Item struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Description   string `json:"description"`
	ImageURL string `json:"imageUrl"`
}

type PackItem struct {
	PackItemID int  `json:"packItemId"`
	Item       Item `json:"item"`
}