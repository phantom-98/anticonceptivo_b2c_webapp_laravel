<?php


namespace App\Packages;


class InnovaSEO
{
    private $name;
    private $title;
    private $description;
    private $url;
    private $image;
    private $keywords;
    private $author;
    private $rights;
    private $language = 'Spanish';
    private $robots = "index, follow";

    /**
     * InnovaSEO constructor.
     * @param string $name
     * @param string $title
     * @param string $description
     * @param string $url
     * @param string|null $image
     * @param string|null $keywords
     * @param string $author
     * @param string $rights
     */
    public function __construct(string $name, string $title, string $description, string $url, string $image, string $keywords, string $author, string $rights)
    {
        $this->name = substr($name, 0, 75);
        $this->title = substr($title, 0, 75);
        $this->description = substr($description, 0, 255);
        $this->url = $url;
        $this->image = $image;
        $this->keywords = $keywords;
        $this->author = $author;
        $this->rights = $rights;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return string
     */
    public function getUrl(): string
    {
        return $this->url;
    }

    /**
     * @param string $url
     */
    public function setUrl(string $url): void
    {
        $this->url = $url;
    }

    /**
     * @return string|null
     */
    public function getImage(): ?string
    {
        return $this->image;
    }

    /**
     * @param string|null $image
     */
    public function setImage(?string $image): void
    {
        $this->image = $image;
    }

    /**
     * @return string|null
     */
    public function getKeywords(): ?string
    {
        return $this->keywords;
    }

    /**
     * @param string|null $keywords
     */
    public function setKeywords(?string $keywords): void
    {
        $this->keywords = $keywords;
    }

    /**
     * @return string
     */
    public function getAuthor(): string
    {
        return $this->author;
    }

    /**
     * @param string $author
     */
    public function setAuthor(string $author): void
    {
        $this->author = $author;
    }

    /**
     * @return string
     */
    public function getRights(): string
    {
        return $this->rights;
    }

    /**
     * @param string $rights
     */
    public function setRights(string $rights): void
    {
        $this->rights = $rights;
    }

    /**
     * @return string
     */
    public function getLanguage(): string
    {
        return $this->language;
    }

    /**
     * @param string $language
     */
    public function setLanguage(string $language): void
    {
        $this->language = $language;
    }

    /**
     * @return string
     */
    public function getRobots(): string
    {
        return $this->robots;
    }

    /**
     * @param string $robots
     */
    public function setRobots(string $robots): void
    {
        $this->robots = $robots;
    }


    public function getSiteMeta(): string
    {
        return '<title>' . $this->buildTitle() . '</title>
                <meta name="apple-mobile-web-app-title" content="' . $this->buildTitle() . '">
                <meta name="application-name" content="' . $this->name . '">
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="title" content="' . $this->buildTitle() . '">
                <meta name="description" content="' . $this->description . '">
                <meta name="keywords" content="' . $this->keywords . '">
                <meta name="robots" content="' . $this->robots . '">
                <meta name="language" content="' . $this->language . '">
                <meta name="author" content="' . $this->author . '">
                <meta name="rights" content="' . $this->rights . '"/>';
    }

    public function getFacebookMeta(): string
    {
        return '<!-- Open Graph / Facebook -->
                <meta property="og:type" content="website">
                <meta property="og:url" content="' . $this->url . '">
                <meta property="og:title" content="' . $this->buildTitle() . '">
                <meta property="og:description" content="' . $this->description . '">
                <meta property="og:image" content="' . $this->image . '">';
    }

    public function getTwitterMeta(): string
    {
        return '<!-- Twitter -->
                <meta property="twitter:card" content="summary_large_image">
                <meta property="twitter:url" content="' . $this->url . '">
                <meta property="twitter:title" content="' . $this->buildTitle() . '">
                <meta property="twitter:description" content="' . $this->description . '">
                <meta property="twitter:image" content="' . $this->image . '">';

    }

    public function getFullMeta(): string
    {
        return $this->getSiteMeta() . $this->getFacebookMeta() . $this->getTwitterMeta();
    }

    public function getPreload(): string
    {
        return '<div>
                    <h1>' . $this->buildTitle() . '</h1>
                    <p>' . $this->description . '</p>
                    <p><img src="' . $this->image . '" alt="' . $this->url . '"></p>
                </div>';
    }

    private function buildTitle(): string
    {
        if ($this->name == $this->title) {
            return $this->title;
        }
        return $this->title;
    }
}
