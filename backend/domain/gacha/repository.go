package gacha

type Repository interface {
	FindAvailableItems(packID int) ([]PackItem, error)
	MarkItemUsed(packItemID int) error
	CountRemainingItems(packID int) (int, error)
}