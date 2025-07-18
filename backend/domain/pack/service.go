package pack

type Service struct {
	Repo Repository
}

func (s *Service) GetAllPacks() ([]Pack, error) {
	return s.Repo.FindAll()
}

func (s *Service) GetPackByID(id int) (*Pack, error) {
	return s.Repo.FindByID(id)
}

func (s *Service) GetPackItems(packID int) ([]Item, error) {
	return s.Repo.FindItemsByPackID(packID)
}
