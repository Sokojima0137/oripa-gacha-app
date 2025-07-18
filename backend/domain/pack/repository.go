package pack

type Repository interface {
	FindAll() ([]Pack, error)
	FindByID(id int) (*Pack, error)
	FindItemsByPackID(packID int) ([]Item, error)
}
