package authentication;

import plant.Plant;

import java.util.List;

public interface WoodsmanDao {
    public List<Woodsman> getAllWoodsmen();
    public Woodsman getWoodsman(int woodsmanId);
    public void addWoodsman(Woodsman woodsman);
    public void updateWoodsman(Woodsman woodsman);
    public void deleteWoodsman(Woodsman woodsman);
}
