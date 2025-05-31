package pack

type Repository interface {
	FindAll() ([]Pack, error)
	FindByID(id int) (*Pack, error)
}